const db = require("../connection");

exports.getTopicsList = () => {
  return db.query(`SELECT * FROM topics;`).then((result) => {
    return result.rows;
  });
};
