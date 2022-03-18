const {
  selectAllArticles,
} = require("../models/selectAllArticlesQueries.models");

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order, topic } = req.query;
  console.log(sort_by, "< sort_by,", order, "< order", topic, "< topic");
  selectAllArticles(sort_by, order, topic)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
