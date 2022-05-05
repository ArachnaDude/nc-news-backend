const { insertComment } = require("../models/insertComment.models");

exports.postComment = (req, res, next) => {
  const { params, body } = req;
  const parsedId = parseInt(params.article_id);
  insertComment(parsedId, body.username, body.body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};
