const db = require("../connection");

exports.selectAllArticles = () => {
  console.log("selecting articles model");
  return db
    .query(
      `SELECT articles.author, articles.title,
    articles.article_id, articles.topic, articles.created_at,
    articles.votes, COUNT(comment_id) AS comment_count FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id
    GROUP BY articles.article_id;`
    )
    .then((articles) => {
      return articles.rows;
    });
};
