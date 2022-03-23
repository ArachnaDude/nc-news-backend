const { deleteComment } = require("../models/deleteComment.models");

exports.removeComment = (req, res, next) => {
  console.log("controller");
  console.log(req.params);
  const { comment_id } = req.params;
  deleteComment(comment_id)
    .then((result) => {
      res.sendStatus(204);
    })
    .catch(next);
};
