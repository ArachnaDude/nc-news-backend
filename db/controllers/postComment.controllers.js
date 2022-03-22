const { insertComment } = require("../models/insertComment.models");

exports.postComment = (req, res, next) => {
  console.log("controller");
  const { params, body } = req;
  console.log(params.article_id);
  console.log(body.username, body.body);
  insertComment(params.article_id, body.username, body.body);
};
