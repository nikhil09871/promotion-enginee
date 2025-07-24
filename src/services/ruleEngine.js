const yaml = require('js-yaml');
const fs = require('fs');
let rules = [];

function loadRulesFromFile() {
  try {
    const file = fs.readFileSync('rules/promotions.yaml', 'utf8');
    const data = yaml.load(file);
    rules = (data || []).sort((a, b) => a.priority - b.priority); // ✅ Sort by priority
    console.log(`✅ Loaded ${rules.length} rules`);
  } catch (err) {
    console.error('❌ Failed to load rules:', err.message);
  }
}

function getRules() {
  return rules;
}

module.exports = { loadRulesFromFile, getRules };
