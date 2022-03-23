const db = require("../connection");

exports.updateArticleVotes = (article_id, inc_votes) => {
  return db
    .query(
      `UPDATE articles 
    SET votes = votes + $1 
    WHERE article_id = $2 
    RETURNING *;`,
      [inc_votes, article_id]
    )
    .then((result) => {
      if (!result.rows.length) {
        return Promise.reject({
          status: 404,
          message: `Article ${article_id} not found`,
        });
      }
      return result.rows;
    });
};
