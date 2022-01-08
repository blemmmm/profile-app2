#!/bin/bash

echo "--> postgresql_create.sh"

if [ "$EUID" -ne 0 ]; then
  echo "Error: please run as root."
  exit 1
fi

echo "--> strict mode"
set -eu

read -p "--> Enter host (localhost): " host
if [ -z $host ]; then
  host="localhost"
fi

read -p "--> Enter port (5432): " port
if [ -z $port ]; then
  port="5432"
fi

read -p "--> Enter database (postgres): " dbname
if [ -z $dbname ]; then
  dbname="postgres"
fi

read -p "--> Enter username (postgres): " username
if [ -z $username ]; then
  username="postgres"
fi

read -p "--> Enter password (postgres): " password
if [ -z $password ]; then
  password="postgres"
fi

pgpass_path="$HOME/.pgpass"
pgpass_data="$host:$port:*:$username:$password"
echo $pgpass_data > $pgpass_path
chmod 600 $pgpass_path

pwd=$(pwd)
timestamp=$(date +%s)
temp_path="$pwd/temp"
dump_path="$temp_path/$dbname-$timestamp.sql"

echo "--> mkdir: $temp_path"
mkdir --parents $temp_path

echo "--> pg_dump: $dump_path"
pg_dump --host=$host --port=$port --dbname=$dbname --username=$username --format=custom --compress=9 --file=$dump_path || true

echo "--> dropdb"
dropdb --host=$host --port=$port --username=$username $dbname || true

echo "--> createdb"
createdb --host=$host --port=$port --username=$username $dbname

echo "--> psql"
psql --host=$host --port=$port --dbname=$dbname --username=$username --file=./postgresql_init.sql

echo "" > pgpass_path
cat pgpass_path