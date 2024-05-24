const express = require("express");
const app = express();
const port = process.env.NODE_DOCKER_PORT || 8080;
const cors = require("cors");

var corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:8080",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
