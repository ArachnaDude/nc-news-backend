const {
  getCommentsByArticle,
} = require("../models/getCommentsByArticle.models");

exports.fetchCommentsByArticle = (req, res, next) => {
  console.log("what up from fetchCommentsByArticle");
  const { article_id } = req.params;
  getCommentsByArticle(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};
