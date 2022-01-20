const express = require("express");
const res = require("express/lib/response");
const app = express();
const {
  sendWelcome,
  fetchTopicsList,
  fetchArticleById,
} = require("./controllers");

app.use(express.json());

app.get("/api/welcome", sendWelcome);

app.get("/api/topics", fetchTopicsList);

app.get("/api/articles/:article_id", fetchArticleById);

app.all("*", (req, res) => {
  res.status(404).send({ message: "URL not found" });
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") res.status(400).send({ message: "Bad request" });
  else next(err);
});

app.use((err, req, res, next) => {
  console.log(err, "what we get back from model");
  res.status(err.status).send({ message: err.message });
});

module.exports = app;
