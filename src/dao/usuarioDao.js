const pool = require("../config/database.js");

module.exports = {
  async getAllUsers() {
    return new Promise((resolve, reject) => {
      pool
        .promise()
        .query("select * from usuario")
        .then(([result]) => resolve(result))
        .catch((err) => reject(err))
        .finally(() => pool.end());
    });
  },
  async findUser(email) {
    const res = await db.query(`SELECT * FROM usuario WHERE email=$1 LIMIT 1`, [
      email,
    ]);

    if (res.rows.length > 0) return res.rows[0];
    else return null;
  },
  async findUserById(id) {
    const res = await db.query(`SELECT * FROM usuario WHERE id=$1 LIMIT 1`, [
      id,
    ]);

    if (res.rows.length > 0) return res.rows[0];
    else return null;
  },
  async criptografarSenha(id, senha) {
    console.log(id, senha);
    const res = await db.query(`UPDATE usuario SET senha = $2 WHERE id=$1`, [
      id,
      senha,
    ]);

    if (res.rows.length > 0) return res.rows[0];
    else return null;
  },
};
