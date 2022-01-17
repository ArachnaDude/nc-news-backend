const db = require("../connection");
const format = require("pg-format");
const { formatTopics } = require("../utils/format-topics.utils");
const { formatUsers } = require("../utils/format-users.utils");
const { formatArticles } = require("../utils/format-articles.utils");

const seed = async (data) => {
  const { articleData, commentData, topicData, userData } = data;
  // 1. create tables
  await db.query(`DROP TABLE IF EXISTS comments;`);
  await db.query(`DROP TABLE IF EXISTS articles;`);
  await db.query(`DROP TABLE IF EXISTS users;`);
  await db.query(`DROP TABLE IF EXISTS topics;`);
  await db.query(`CREATE TABLE topics (
    slug TEXT PRIMARY KEY,
    description TEXT
  );`);
  await db.query(`CREATE TABLE users (
    username TEXT PRIMARY KEY,
    avatar_url TEXT,
    name TEXT
  );`);
  await db.query(`CREATE TABLE articles (
    article_id SERIAL PRIMARY KEY,
    title TEXT,
    body TEXT,
    votes INT DEFAULT 0,
    topic TEXT REFERENCES topics (slug),
    author TEXT REFERENCES users (username),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`);
  await db.query(`CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    author TEXT REFERENCES users (username),
    article_id INT REFERENCES articles (article_id)
  );`);

  // 2. insert data

  // data processing for topics
  const topicArray = formatTopics(topicData);
  const topicSql = format(
    `INSERT INTO topics (slug, description) VALUES %L RETURNING *;`,
    topicArray
  );
  const topicInsert = await db.query(topicSql);

  //data processing for users
  const userArray = formatUsers(userData);
  const userSql = format(
    `INSERT INTO users (username, avatar_url, name) VALUES %L RETURNING *;`,
    userArray
  );
  const userInsert = await db.query(userSql);

  //data processing for articles
  const articleArray = formatArticles(articleData);
  const articleSql = format(
    `INSERT INTO articles (title, body, votes, topic, author, created_at) VALUES %L RETURNING *;`,
    articleArray
  );
  const articleInsert = await db.query(articleSql);
  console.log(articleInsert.rows);
};

module.exports = seed;
