const db = require("../connection");
const format = require("pg-format");

exports.getCommentsByArticle = (article_id) => {
  console.log("we're in the model now homie");

  const queryStr = format(
    `SELECT * FROM comments WHERE article_id = %L`,
    article_id
  );

  return db.query(queryStr).then((result) => {
    console.log(result.rows, "result");
    return result.rows;
  });
};
