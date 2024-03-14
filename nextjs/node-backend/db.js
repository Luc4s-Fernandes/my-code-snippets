//./lib/db

//import Pool from 'pg';
const { Pool } = require('pg');

const pool = new Pool({
    user: 'user',
    host: 'localhost',
    database: 'db',
    password: 'password',
    port: 5432,
});

pool.connect().then(() => {
    console.log('\n@Connection with postgres succeeded\n');
}).catch((err) => {
    console.error('\n@Unable to connect to the database: ', err, '\n');
});

//export default pool;
module.exports = pool;