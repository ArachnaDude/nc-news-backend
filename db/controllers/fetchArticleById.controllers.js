const { getArticleById } = require("../models/getArticleById.models");

exports.fetchArticleById = (req, res, next) => {
  getArticleById(req.params.article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};
