const {
  selectAllArticles,
} = require("../models/selectAllArticlesQueries.models");

exports.getAllArticles = (req, res) => {
  console.log("getting all articles");
  selectAllArticles().then((articles) => {
    res.status(200).send({ articles });
  });
};
