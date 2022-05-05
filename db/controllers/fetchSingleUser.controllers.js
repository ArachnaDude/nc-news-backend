const { getSingleUser } = require("../models/getSingleUser.models");

exports.fetchSingleUser = (req, res, next) => {
  const { params } = req;
  getSingleUser(params.username)
    .then((result) => {
      res.status(200).send({ user: result });
    })
    .catch(next);
};
