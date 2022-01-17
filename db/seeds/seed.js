const db = require("../connection");
const format = require("pg-format");

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

  await db.query(`INSERT INTO users `);
};

module.exports = seed;
