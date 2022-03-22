const format = require("pg-format");
const { query } = require("../connection");
const db = require("../connection");

exports.selectAllArticles = (sort_by = "created_at", order = "DESC", topic) => {
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

  //const queryParams = [];

  if (
    !validSorts.includes(sort_by) ||
    !validOrder.includes(order.toUpperCase())
  ) {
    return Promise.reject({ status: 400, message: "Bad request" });
  }

  let queryString = `SELECT articles.author, articles.title,
  articles.article_id, articles.topic, articles.created_at,
  articles.votes, COUNT(comment_id) AS comment_count FROM articles
  LEFT JOIN comments ON comments.article_id = articles.article_id
  `;

  if (topic) {
    queryString += format(
      `
    WHERE articles.topic ILIKE %L
    `,
      topic
    );
  }

  queryString += `GROUP BY articles.article_id
  ORDER BY ${sort_by} ${order};`;

  //console.log(queryString, "queryString");

  return db.query(queryString).then((articles) => {
    console.log(topic, articles.rows, articles.rows.length);
    if (articles.rows.length) {
      return articles.rows;
    } else
      return db
        .query(`SELECT * FROM topics WHERE slug = $1`, [topic])
        .then((result) => {
          if (result.rows.length) {
            return articles.rows;
          } else
            return Promise.reject({
              status: 404,
              message: `${topic} not found`,
            });
        });
  });
};
