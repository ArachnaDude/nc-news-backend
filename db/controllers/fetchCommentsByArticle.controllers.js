const {
  getCommentsByArticle,
} = require("../models/getCommentsByArticle.models");

exports.fetchCommentsByArticle = (req, res, next) => {
  console.log("controller");
  const { article_id } = req.params;
  const { sort_by, order } = req.query;
  console.log(sort_by, order);
  getCommentsByArticle(article_id, sort_by, order)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};
