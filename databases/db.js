require('dotenv').config();
const { Pool } = require ('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASS,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
})

pool.connect()
  .then(() => console.log('Database connected!'))
  .catch((err) => console.error(err));

module.exports = pool;