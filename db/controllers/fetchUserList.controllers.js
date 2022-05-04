const { getUserList } = require("../models/getUserList.models");

exports.fetchUserList = (req, res, next) => {
  getUserList()
    .then((result) => {
      console.log(result, "result");
      res.status(200).send({ users: result });
    })
    .catch(next);
};
