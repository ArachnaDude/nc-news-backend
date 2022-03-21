const {
  selectAllArticles,
} = require("../models/selectAllArticlesQueries.models");

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order, topic } = req.query;
  selectAllArticles(sort_by, order, topic)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
