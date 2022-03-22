const db = require("../connection");

exports.insertComment = (article_id, username, body) => {
  console.log("model");
  console.log(article_id);
  console.log(username);
  console.log(body);

  return db.query(`INSERT INTO `);
};
