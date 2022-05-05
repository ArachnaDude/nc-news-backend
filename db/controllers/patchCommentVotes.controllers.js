const { updateCommentVotes } = require("../models/updateCommentVotes.models");

exports.patchCommentVotes = (req, res, next) => {
  const { params, body } = req;
  updateCommentVotes(params.comment_id, body.inc_votes)
    .then((result) => {
      res.status(200).send({ comment: result });
    })
    .catch(next);
};
