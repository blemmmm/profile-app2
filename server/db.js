const postgres = require('postgres');
const fs = require('fs');
const path = require('path');

const config_path = path.join(process.cwd(), 'project.config.json');
const config = JSON.parse(fs.readFileSync(config_path, { encoding: 'utf-8' }));

const sql = postgres({
  host: config.postgresql_host,
  port: config.postgresql_port,
  database: config.postgresql_database,
  username: config.postgresql_username,
  password: config.postgresql_password,
}); // will default to the same as psql

module.exports = sql;