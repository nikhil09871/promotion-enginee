const express = require('express');
const router = express.Router();
const { getRules, loadRulesFromFile } = require('../services/ruleEngine');
const {
  totalEvaluations,
  hits,
  misses,
  latencyHistogram,
} = require('../utils/metrics');

router.post('/', (req, res) => {
  const start = process.hrtime();
  const player = req.body;
  totalEvaluations.inc();

  // Validate player attributes
  const validationError = validatePlayer(player);
  if (validationError) {
    recordLatency(start);
    return res.status(400).json({ error: validationError });
  }

  const rules = getRules();

  
  const matchedRules = rules.filter(rule => matchRule(rule.conditions, player));

  if (matchedRules.length === 0) {
    misses.inc();
    recordLatency(start);
    return res.json(null);
  }

  matchedRules.sort((a, b) => a.priority - b.priority);
  const selectedRule = matchedRules[0];

  hits.inc();
  recordLatency(start);
  return res.json(selectedRule.promotion);
});

//Reload rules dynamically without restart
router.post('/reload', (req, res) => {
  loadRulesFromFile();
  res.json({ message: 'Rules reloaded' });
});

// Validate player data
function validatePlayer(player) {
  if (!player.level || typeof player.level !== 'number' || player.level < 0) {
    return 'Invalid or missing player level';
  }

  if (!player.country || typeof player.country !== 'string') {
    return 'Invalid or missing country';
  }

  if (
    player.days_since_last_purchase !== undefined &&
    (typeof player.days_since_last_purchase !== 'number' || player.days_since_last_purchase < 0)
  ) {
    return 'Invalid days_since_last_purchase';
  }

  if (
    player.spend_tier &&
    typeof player.spend_tier !== 'string'
  ) {
    return 'Invalid spend_tier';
  }

  return null;
}

// Rule matching logic
function matchRule(conditions, player) {
  if (conditions.level) {
    const { min = 0, max = Infinity } = conditions.level;
    if (player.level < min || player.level > max) return false;
  }
  if (conditions.country) {
    if (!conditions.country.includes(player.country)) return false;
  }
  if (conditions.days_since_last_purchase) {
    const { min = 0, max = Infinity } = conditions.days_since_last_purchase;
    if (
      player.days_since_last_purchase < min ||
      player.days_since_last_purchase > max
    ) return false;
  }
  if (conditions.spend_tier) {
    if (player.spend_tier !== conditions.spend_tier) return false;
  }
  return true;
}

// Record latency into histogram
function recordLatency(start) {
  const diff = process.hrtime(start);
  const latencyInSeconds = diff[0] + diff[1] / 1e9;
  latencyHistogram.observe(latencyInSeconds);
}

module.exports = router;
