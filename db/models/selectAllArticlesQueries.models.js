const db = require("../connection");

exports.selectAllArticles = (sort_by = "created_at", order = "DESC") => {
  const validSorts = [
    "author",
    "title",
    "article_id",
    "topic",
    "created_at",
    "votes",
    "comment_count",
  ];

  const validOrder = ["ASC", "DESC"];

  if (
    !validSorts.includes(sort_by) ||
    !validOrder.includes(order.toUpperCase())
  ) {
    return Promise.reject({ status: 400, message: "Bad request" });
  }

  return db
    .query(
      `SELECT articles.author, articles.title,
    articles.article_id, articles.topic, articles.created_at,
    articles.votes, COUNT(comment_id) AS comment_count FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id
    GROUP BY articles.article_id ORDER BY ${sort_by} ${order};`
    )
    .then((articles) => {
      return articles.rows;
    });
};
