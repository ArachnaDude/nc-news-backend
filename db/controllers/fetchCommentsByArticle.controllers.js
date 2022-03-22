const {
  getCommentsByArticle,
} = require("../models/getCommentsByArticle.models");

exports.fetchCommentsByArticle = (req, res, next) => {
  const { article_id } = req.params;
  getCommentsByArticle(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};
