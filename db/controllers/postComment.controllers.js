const { insertComment } = require("../models/insertComment.models");

exports.postComment = () => {
  console.log("controller");
  insertComment();
};
