const postgres = require('postgres');

const sql = postgres('postgres://username:password@host:port/database', {
  host: 'localhost',
  port: 5432,
  database: 'db_users',
  username: 'postgres',
  password: '1234',
}); // will default to the same as psql

module.exports = sql;