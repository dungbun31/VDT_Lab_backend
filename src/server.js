const express = require("express");
const app = express();
const port = process.env.NODE_DOCKER_PORT || 8080;
const sequelize = require("./database");
const cors = require("cors");
const studentsController = require("./students_controller");
const metricsRouter = require("./metricsRouter");
const metricsMiddleware = require("./metricsMiddleware");

var corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:8080",
  origin: "http://localhost:8888",
  origin: "http://192.168.123.12:30080",
};

app.use(cors(corsOptions));

app.use(metricsMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/students", studentsController);

app.use(metricsRouter);

sequelize.sync().then(() => {
  console.log("Database connected");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
