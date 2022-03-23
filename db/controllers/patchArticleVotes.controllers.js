const { updateArticleVotes } = require("../models/updateArticleVotes.models");

exports.patchArticleVotes = (req, res, next) => {
  const { params, body } = req;
  updateArticleVotes(params.article_id, body.inc_votes)
    .then((result) => {
      res.status(200).send({ "Updated article": result });
    })
    .catch(next);
};
