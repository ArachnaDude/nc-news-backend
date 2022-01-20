const { getTopicsList } = require("../models/getTopicsList.models");

exports.fetchTopicsList = (req, res) => {
  getTopicsList().then((result) => {
    res.status(200).send({ topics: result });
  });
};
