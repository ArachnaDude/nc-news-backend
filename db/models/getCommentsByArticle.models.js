const db = require("../connection");
const format = require("pg-format");

exports.getCommentsByArticle = (
  article_id,
  sort_by = "created_at",
  order = "DESC"
) => {
  console.log("model");
  const validSorts = ["created_at", "votes"];
  const validOrder = ["ASC", "DESC"];

  if (
    !validSorts.includes(sort_by) ||
    !validOrder.includes(order.toUpperCase())
  ) {
    return Promise.reject({ status: 400, message: "Bad request" });
  }

  const queryStr = format(
    `SELECT * FROM comments WHERE article_id = %L ORDER BY ${sort_by} ${order};`,
    article_id
  );

  return db.query(queryStr).then((comments) => {
    if (comments.rows.length) {
      return comments.rows;
    } else {
      return db
        .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
        .then((result) => {
          if (result.rows.length) {
            return comments.rows;
          } else {
            return Promise.reject({
              status: 404,
              message: `Article ${article_id} not found`,
            });
          }
        });
    }
  });
};
