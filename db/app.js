const cors = require("cors");
const express = require("express");
const app = express();
const {
  sendWelcome,
  fetchTopicsList,
  fetchArticleById,
  patchArticleVotes,
  getEndpoints,
  getAllArticles,
  fetchCommentsByArticle,
  postComment,
  removeComment,
  fetchUserList,
  fetchSingleUser,
  patchCommentVotes,
} = require("./controllers");
const {
  handle404,
  handlePsqlErrors,
  handleCustomErrors,
} = require("../db/errors/errors");

//required to enable CORS for frontend use
app.use(cors());

//need this to parse a body. req.body doesn't exist without this!
app.use(express.json());

//sends back endpoints.json
app.get("/api", getEndpoints);

//sends user a welcome to the api
app.get("/api/welcome", sendWelcome);

//returns a list of topics
app.get("/api/topics", fetchTopicsList);

//returns an array of user objects
app.get("/api/users", fetchUserList);

//returns a single user object
app.get("/api/users/:username", fetchSingleUser);

//returns a particular topic
app.get("/api/articles/:article_id", fetchArticleById);

//accepts a body, and returns an article with an updated vote count
app.patch("/api/articles/:article_id", patchArticleVotes);

//accepts a body, and returns a comment with an updated vote count
app.patch("/api/comments/:comment_id", patchCommentVotes);

//returns a list of articles, and accepts queries
app.get("/api/articles", getAllArticles);

//returns a list of comments for a given article id
app.get("/api/articles/:article_id/comments", fetchCommentsByArticle);

//accepts a username and body, and returns the posted comment
app.post("/api/articles/:article_id/comments", postComment);

//returns nothing - deletes comment by ID
app.delete("/api/comments/:comment_id", removeComment);

//ERROR HANDLING

//handles 404 errors for invalid paths for all request types
app.all("*", handle404);

// psql error handling
app.use(handlePsqlErrors);

//custom error handler
app.use(handleCustomErrors);

module.exports = app;
