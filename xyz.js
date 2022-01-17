return db
  .query(`DROP TABLE IF EXISTS comments;`)
  .then(() => {
    return db.query(`DROP TABLE IF EXISTS articles;`).then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`).then(() => {
        return db.query(`DROP TABLE IF EXISTS topics;`);
      });
    });
  })
  .then(() => {
    return db
      .query(
        `CREATE TABLE topics (
        slug TEXT PRIMARY KEY,
        description TEXT,
      )`
      )
      .then(() => {
        return db
          .query(
            `CREATE TABLE users (
          username TEXT PRIMARY KEY,
          avatar_url TEXT,
          name TEXT
        )`
          )
          .then(() => {
            return db.query(`CREATE TABLE articles (
            article_id SERIAL PRIMARY KEY,
            title TEXT,
            body TEXT,
            votes INT DEFAULT 0,
            topic REFERENCES topics (slug),
            author REFERENCES users (username),
            created_at BIGINT DEFAULT CURRENT_TIMESTAMP
          )`);
          });
      });
  });
