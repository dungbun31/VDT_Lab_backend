const express = require("express");
const cors = require("cors");
const sequelize = require("./database");
const studentRouter = require("./studentsRouter");
const userRouter = require("./userRouter");
const metricsMiddleware = require("./metricsMiddleware");
const { authenticateToken, authorizeRole } = require("./authMiddleware");

require("dotenv").config();

const app = express();
const port = process.env.NODE_DOCKER_PORT || 8080;

var corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:8080",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 

sequelize.sync().then(() => console.log("Database connected"));

app.use(metricsMiddleware);

app.use("/api/students", authenticateToken, studentRouter);
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
