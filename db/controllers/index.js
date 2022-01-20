const { sendWelcome } = require("./sendWelcome.controllers");
const { fetchTopicsList } = require("./fetchTopicsList.controllers");
const { fetchArticleById } = require("./fetchArticleById.controllers");

module.exports = { sendWelcome, fetchTopicsList, fetchArticleById };
