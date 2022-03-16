const db = require("../connection");

exports.selectAllArticles = (sort_by = "created_at") => {
  return db
    .query(
      `SELECT articles.author, articles.title,
    articles.article_id, articles.topic, articles.created_at,
    articles.votes, COUNT(comment_id) AS comment_count FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id
    GROUP BY articles.article_id ORDER BY ${sort_by} DESC;`
    )
    .then((articles) => {
      return articles.rows;
    });
};
