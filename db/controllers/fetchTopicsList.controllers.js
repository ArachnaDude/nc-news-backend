const { getTopicsList } = require("../models/getTopicsList.models");

exports.fetchTopicsList = (req, res) => {
  console.log("fetchTopicsList controller");
  getTopicsList().then((result) => {
    console.log(result, "back into the controller");
    res.status(200).send({ topics: result });
  });
};
