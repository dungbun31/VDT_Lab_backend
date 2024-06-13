const promClient = require("prom-client");
const register = new promClient.Registry();

promClient.collectDefaultMetrics({ register });

const createCounter = (name, help, labelNames) => {
  const counter = new promClient.Counter({ name, help, labelNames });
  register.registerMetric(counter);
  return counter;
};

const createHistogram = (name, help, labelNames, buckets) => {
  const histogram = new promClient.Histogram({
    name,
    help,
    labelNames,
    buckets,
  });
  register.registerMetric(histogram);
  return histogram;
};

const httpRequestCounter = createCounter(
  "http_request_total",
  "Total number of HTTP requests",
  ["method", "route", "status_code"]
);

const httpRequestDuration = createHistogram(
  "http_request_duration_seconds",
  "Duration of HTTP requests in seconds",
  ["method", "route", "status_code"],
  [0.1, 0.5, 1, 2, 5]
);
const httpErrorCounter = createCounter(
  "http_error_total",
  "Total number of HTTP errors",
  ["method", "route", "status_code"]
);

const httpSuccessCounter = createCounter(
  "http_success_total",
  "Total number of successful HTTP requests",
  ["method", "route", "status_code"]
);

module.exports = {
  register,
  httpRequestCounter,
  httpRequestDuration,
  httpErrorCounter,
  httpSuccessCounter,
};