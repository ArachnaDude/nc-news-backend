const express = require("express");
const app = express();
const {
  sendWelcome,
  fetchTopicsList,
  fetchArticleById,
  patchArticleVotes,
} = require("./controllers");
const { handle404 } = require("../db/errors/errors");

//need this to parse a body. req.body doesn't exist without this!
app.use(express.json());

//sends user a welcome to the api
app.get("/api/welcome", sendWelcome);

//returns a list of topics
app.get("/api/topics", fetchTopicsList);

//returns a particular topic
app.get("/api/articles/:article_id", fetchArticleById);

//accepts a body, and returns an article with an updated vote count
app.patch("/api/articles/:article_id", patchArticleVotes);

//returns a list of articles, and accepts queries
app.get("/api/articles");

//ERROR HANDLING

//handles 404 errors for invalid paths for all request types
app.all("*", handle404);

// psql error handling
app.use((err, req, res, next) => {
  console.log("psql error handling");
  if (err.code === "22P02") res.status(400).send({ message: "Bad request" });
  else next(err);
});

//custom error handler
app.use((err, req, res, next) => {
  console.log(err, "what we get back from model");
  res.status(err.status).send({ message: err.message });
});

module.exports = app;
