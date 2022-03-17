const {
  selectAllArticles,
} = require("../models/selectAllArticlesQueries.models");

exports.getAllArticles = (req, res, next) => {
  console.log(req.query, "req.query");
  const { sort_by, order } = req.query;
  console.log(sort_by, "< sort_by,", order, "< order");
  selectAllArticles(sort_by, order)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
