const express = require("express");
const { register } = require("./metrics");
const router = express.Router();

router.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

router.post("/metrics", async (req, res) => {
  console.log(req.body);
  res.status(200).send("Metrics received");
});

module.exports = router;
