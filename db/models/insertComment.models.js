const db = require("../connection");

exports.insertComment = (article_id, username, body) => {
  return db
    .query(
      `INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;`,
      [article_id, username, body]
    )
    .then((result) => {
      return result.rows[0];
    });
};
