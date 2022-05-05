const { getUserList } = require("../models/getUserList.models");

exports.fetchUserList = (req, res, next) => {
  getUserList()
    .then((result) => {
      res.status(200).send({ users: result });
    })
    .catch(next);
};
