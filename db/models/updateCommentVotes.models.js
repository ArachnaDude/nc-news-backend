const db = require("../connection");

exports.updateCommentVotes = (comment_id, inc_votes = 0) => {
  return db
    .query(
      `UPDATE comments
     SET votes = votes + $1 
     WHERE comment_id = $2 
     RETURNING *;`,
      [inc_votes, comment_id]
    )
    .then((result) => {
      if (!result.rows.length) {
        return Promise.reject({
          status: 404,
          message: `Comment ${comment_id} not found`,
        });
      }
      return result.rows[0];
    });
};
