const express = require("express");
const app = express();
const port = process.env.NODE_DOCKER_PORT || 8080;
const sequelize = require("./database");
const cors = require("cors");
const studentsController = require("./students_controller");

var corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:8080",
};

app.use(cors(corsOptions));

sequelize.sync().then(() => {
  console.log("Database connected");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/students", studentsController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
