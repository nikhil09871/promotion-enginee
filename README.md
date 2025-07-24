# Promotion Rule Engine Microservice

A lightweight Node.js-based REST API to select in-game promotions based on configurable YAML rules.

---

## Tech Stack

- Node.js + Express
- YAML for rules
- Jest for testing
- Prometheus metrics
- Postman for API testing

---

##  Run Locally

```bash
git clone https://github.com/nikhil09871/promotion-engine.git
cd promotion-engine
npm install
crete a .env file in the main project folder:
        PORT=5000
        MONGO_URI=your mongo uri 
npx nodemon src/server.js



## for testing



'''bash
npm install --save-dev jest supertest
$env:NODE_ENV="test"
npx jest
'''





## postman collection

---->Evaluate Promotion

post   http://localhost:5000/promotion

raw data
{
  "level": 10,
  "country": "IN",
  "days_since_last_purchase": 5,
  "spend_tier": "medium"
}

output:
{
    "title": "Comeback Bonus",
    "reward": "100 gold"
}

-->Reload Rules

POST    http://localhost:5000/promotion/reload

output :"{
    "message": "Rules reloaded"
}"


-->Metrics

GET   http://localhost:5000/metrics

output like this :
                 # TYPE promotion_hits counter
                 promotion_hits 2

# HELP promotion_misses Number of promotion misses (no match)
# TYPE promotion_misses counter
promotion_misses 0

# HELP promotion_evaluation_latency_seconds Latency of evaluation in seconds
# TYPE promotion_evaluation_latency_seconds histogram
promotion_evaluation_latency_seconds_bucket{le="0.01"} 2
promotion_evaluation_latency_seconds_bucket{le="0.05"} 2
promotion_evaluation_latency_seconds_bucket{le="0.1"} 2
promotion_evaluation_latency_seconds_bucket{le="0.2"} 2
promotion_evaluation_latency_seconds_bucket{le="0.5"} 2
promotion_evaluation_latency_seconds_bucket{le="1"} 2
promotion_evaluation_latency_seconds_bucket{le="2"} 2
promotion_evaluation_latency_seconds_bucket{le="+Inf"} 2
promotion_evaluation_latency_seconds_sum 0.000391
promotion_evaluation_latency_seconds_count 2




--------check for other case using promotion.yaml rules in promotion endpoint of promotion----->




 
