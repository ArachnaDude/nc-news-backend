const { getArticleById } = require("../models/getArticleById.models");

exports.fetchArticleById = (req, res, next) => {
  //console.log("fetchArticleById controller");
  //console.log(req.params.article_id, "<<< req.params");
  getArticleById(req.params.article_id)
    .then((article) => {
      console.log(article, "RESULT.LENGTH");
      res.status(200).send({ article });
    })
    .catch(next);
};
