const express = require("express");
const app = express();
const { sendWelcome, fetchTopicsList } = require("./controllers");

//app.use(express.json());

app.get("/api/welcome", sendWelcome);

app.get("/api/topics", fetchTopicsList);

module.exports = app;
