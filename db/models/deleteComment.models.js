const db = require("../connection");

exports.deleteComment = (comment_id) => {
  console.log("model");
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1;`, [comment_id])
    .then((result) => {
      if (!result.rowCount) {
        return Promise.reject({
          status: 404,
          message: `Comment not found`,
        });
      }
    });
};
