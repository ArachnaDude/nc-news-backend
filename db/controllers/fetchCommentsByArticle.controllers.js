const {
  getCommentsByArticle,
} = require("../models/getCommentsByArticle.models");

exports.fetchCommentsByArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by, order } = req.query;
  getCommentsByArticle(article_id, sort_by, order)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};
