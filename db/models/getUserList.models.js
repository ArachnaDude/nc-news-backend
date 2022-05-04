const db = require("../connection");

exports.getUserList = () => {
  return db.query(`SELECT * FROM users;`).then((result) => {
    return result.rows;
  });
};
