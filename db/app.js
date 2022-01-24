const express = require("express");
const app = express();
const {
  sendWelcome,
  fetchTopicsList,
  fetchArticleById,
  patchArticleVotes,
  getEndpoints,
} = require("./controllers");
const {
  handle404,
  handlePsqlErrors,
  handleCustomErrors,
} = require("../db/errors/errors");

//need this to parse a body. req.body doesn't exist without this!
app.use(express.json());

//sends back endpoints.json
app.get("/api", getEndpoints);

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
app.use(handlePsqlErrors);

//custom error handler
app.use(handleCustomErrors);

module.exports = app;
