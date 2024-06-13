const {
  httpRequestCounter,
  httpRequestDuration,
  httpErrorCounter,
  httpSuccessCounter,
} = require("./metrics");

const metricsMiddleware = (req, res, next) => {
  const end = httpRequestDuration.startTimer();
  res.on("finish", () => {
    const labels = {
      method: req.method,
      route: req.route ? req.route.path : req.path,
      status_code: res.statusCode,
    };

    httpRequestCounter.inc(labels);
    end(labels);

    if (res.statusCode >= 400) {
      httpErrorCounter.inc(labels);
    } else {
      httpSuccessCounter.inc(labels);
    }
  });

  next();
};

module.exports = metricsMiddleware;
