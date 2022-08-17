const pool = require("../config/database.js");

module.exports = {
  getAllReclamacao() {
    return new Promise((resolve, reject) => {
      pool
        .promise()
        .query("select * from reclamacao")
        .then(([result]) => {
          resolve(result);
        })
        .catch((err) => reject(err))
        .finally(() => pool.end());
    });
  },
};
