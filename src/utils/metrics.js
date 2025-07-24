const client = require('prom-client');

const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Custom metrics
const totalEvaluations = new client.Counter({
  name: 'promotion_total_evaluations',
  help: 'Total number of promotion evaluations',
});

const hits = new client.Counter({
  name: 'promotion_hits',
  help: 'Number of successful promotion matches',
});

const misses = new client.Counter({
  name: 'promotion_misses',
  help: 'Number of promotion misses (no match)',
});

const latencyHistogram = new client.Histogram({
  name: 'promotion_evaluation_latency_seconds',
  help: 'Latency of evaluation in seconds',
  buckets: [0.01, 0.05, 0.1, 0.2, 0.5, 1, 2]
});

// Register custom metrics
register.registerMetric(totalEvaluations);
register.registerMetric(hits);
register.registerMetric(misses);
register.registerMetric(latencyHistogram);

module.exports = {
  register,
  totalEvaluations,
  hits,
  misses,
  latencyHistogram,
};
