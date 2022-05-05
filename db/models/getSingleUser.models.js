const db = require("../connection");

exports.getSingleUser = (username) => {
  return db
    .query(`SELECT * FROM users WHERE username = $1;`, [username])
    .then((result) => {
      if (!result.rows.length) {
        return Promise.reject({
          status: 404,
          message: `user "${username}" not found`,
        });
      }
      return result.rows[0];
    });
};
