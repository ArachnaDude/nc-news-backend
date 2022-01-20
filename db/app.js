const express = require("express");
const app = express();
const {
  sendWelcome,
  fetchTopicsList,
  fetchArticleById,
} = require("./controllers");
const { handle404 } = require("../db/errors/errors");

app.use(express.json());

app.get("/api/welcome", sendWelcome);

app.get("/api/topics", fetchTopicsList);

app.get("/api/articles/:article_id", fetchArticleById);

app.all("*", handle404);

app.use((err, req, res, next) => {
  if (err.code === "22P02") res.status(400).send({ message: "Bad request" });
  else next(err);
});

//custom error handler
app.use((err, req, res, next) => {
  console.log(err, "what we get back from model");
  res.status(err.status).send({ message: err.message });
});

module.exports = app;
