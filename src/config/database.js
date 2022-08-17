const { Pool } = require('pg');

async function connect() {
    const pool = new Pool({
        connectionString: process.env.POSTGRES_CONECTIONS
    });
    
    // const client = await pool.connect();

    // const res = await client.query('select now()');
    // console.log(res.rows[0]);

    return pool.connect();
};

module.exports = connect;
