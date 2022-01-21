const { sendWelcome } = require("./sendWelcome.controllers");
const { fetchTopicsList } = require("./fetchTopicsList.controllers");
const { fetchArticleById } = require("./fetchArticleById.controllers");
const { patchArticleVotes } = require("./patchArticleVotes.controllers");

module.exports = {
  sendWelcome,
  fetchTopicsList,
  fetchArticleById,
  patchArticleVotes,
};
