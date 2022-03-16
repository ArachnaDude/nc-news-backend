const {
  selectAllArticles,
} = require("../models/selectAllArticlesQueries.models");

exports.getAllArticles = (req, res) => {
  console.log(req.query, "req.query");
  const { sort_by } = req.query;
  console.log(sort_by);
  selectAllArticles(sort_by).then((articles) => {
    res.status(200).send({ articles });
  });
};
