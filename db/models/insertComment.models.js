const db = require("../connection");

exports.insertComment = (article_id, username, body) => {
  console.log("model");
  console.log(typeof article_id);
  console.log(username);
  console.log(body);

  return db
    .query(
      `INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;`,
      [article_id, username, body]
    )
    .then((result) => {
      return result.rows[0];
    });
};
