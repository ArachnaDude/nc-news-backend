const { updateArticleVotes } = require("../models/updateArticleVotes.models");

exports.patchArticleVotes = (req, res, next) => {
  console.log("into the patchArticleVotes controller");
  const { params, body } = req;
  console.log(params, body, "req.params, req.body");
  updateArticleVotes(params.article_id, body.inc_votes)
    .then((result) => {
      res.status(200).send({ "Updated article": result });
    })
    .catch(next);
};
