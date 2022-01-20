const db = require("../connection");

/* need: an object with key "article" and an value of array with:
author (username from users table)
title
article_id
body
topic
created_at
votes
comment_count (total count of all comments with this 
  article_id - query database)
  */

exports.getArticleById = (article_id) => {
  console.log("getArticleById model");

  return db
    .query(
      `SELECT articles.*, COUNT(comment_id) AS comment_count 
    FROM articles 
    LEFT JOIN comments 
    ON comments.article_id = articles.article_id 
    WHERE articles.article_id = $1 
    GROUP BY articles.article_id;`,
      [article_id]
    )
    .then((result) => {
      console.log(result.rows.length, "<<< result.rows");
      return result.rows;
    });

  // return db
  //   .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
  //   .then(({ rows }) => {
  //     const arrayForObj = Object.entries(rows[0]);
  //     arrayForObj.push(["comment_count", 999999]);
  //     console.log(Object.fromEntries(arrayForObj), "object from entries");
  //     return rows;
  //   });
};
