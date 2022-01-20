const express = require("express");
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

app.use((err, req, res, next) => {
  if (err.code === "22P02") res.status(400).send({ message: "Bad request" });
  else next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("something went wrong");
});

module.exports = app;
