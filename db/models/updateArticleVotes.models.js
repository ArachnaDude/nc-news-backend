const db = require("../connection");

exports.updateArticleVotes = (article_id, inc_votes) => {
  console.log("updateArticleVotes model");
  console.log(article_id, "params");
  console.log(inc_votes, "body");

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

// can I test multiple votes without resetting?
