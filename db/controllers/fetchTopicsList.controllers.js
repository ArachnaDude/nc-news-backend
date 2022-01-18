const { getTopicsList } = require("../models/getTopicsList.models");

exports.fetchTopicsList = (req, res) => {
  console.log("into the controller");
  res.sendStatus(200);
};
