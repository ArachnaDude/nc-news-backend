const db = require("../connection");
const format = require("pg-format");

exports.getCommentsByArticle = (article_id) => {
  console.log("we're in the model now homie");

  const queryStr = format(
    `SELECT * FROM comments WHERE article_id = %L`,
    article_id
  );

  return db.query(queryStr).then((comments) => {
    console.log(comments.rows, "commentArray");
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
