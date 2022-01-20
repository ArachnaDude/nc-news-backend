const db = require("../connection");

exports.getTopicsList = () => {
  console.log("getTopicsList model");
  return db.query(`SELECT * FROM topics;`).then((result) => {
    return result.rows;
  });
};
