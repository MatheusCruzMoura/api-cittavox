const connect = require('../config/database.js')

module.exports = {
    async getAllUsers() {
        const conn = await connect();
        const res = await conn.query('select * from usuario');
        conn.end().then(() => console.log('pool has ended'));
        return res.rows
    },
    async findUser(email) {
        const conn = await connect();
        const res = await conn.query(`SELECT * FROM usuario WHERE email=$1 LIMIT 1`, [email]);
        conn.end().then(() => console.log('pool has ended'));
        if (res.rows.length > 0)
            return res.rows[0];
        else return null;
    },    
    async findUserById(id) {
        const conn = await connect();
        const res = await conn.query(`SELECT * FROM usuario WHERE id=$1 LIMIT 1`, [id]);
        conn.end().then(() => console.log('pool has ended'));
        if (res.rows.length > 0)
            return res.rows[0];
        else return null;
    },
    async criptografarSenha(id, senha) {
        const conn = await connect();
        console.log(id, senha)
        const res = await conn.query(`UPDATE usuario SET senha = $2 WHERE id=$1`, [id, senha]);
        conn.end().then(() => console.log('pool has ended'));
        if (res.rows.length > 0)
            return res.rows[0];
        else return null;
    }
}