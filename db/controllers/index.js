const { sendWelcome } = require("./sendWelcome.controllers");
const { fetchTopicsList } = require("./fetchTopicsList.controllers");
const { fetchArticleById } = require("./fetchArticleById.controllers");
const { patchArticleVotes } = require("./patchArticleVotes.controllers");
const { getEndpoints } = require("./getEndpoints.controllers");
const { getAllArticles } = require("./getAllArticlesQueries.controllers");
const {
  fetchCommentsByArticle,
} = require("./fetchCommentsByArticle.controllers");
const { postComment } = require("./postComment.controllers");

module.exports = {
  sendWelcome,
  fetchTopicsList,
  fetchArticleById,
  patchArticleVotes,
  getEndpoints,
  getAllArticles,
  fetchCommentsByArticle,
  postComment,
};
