const { getArticleById } = require("../models/getArticleById.models");

exports.fetchArticleById = (req, res, next) => {
  console.log("fetchArticleById controller");
  console.log(req.params.article_id, "<<< req.params");
  getArticleById(req.params.article_id)
    .then((result) => {
      console.log({ article: result }, "result from controller");
      res.status(200).send({ article: result });
    })
    .catch(next);
};
