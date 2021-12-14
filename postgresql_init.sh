#!/bin/bash

echo "--> postgresql_init.sh"

if [ "$EUID" -ne 0 ]; then
  echo "Error: please run as root."
  exit 1
fi

echo "--> strict mode"
set -eu

read -p "--> Enter your database name: " dbname
if [ -z $dbname ]; then
  echo "Error: invalid database name."
  exit 1
fi

echo "--> mkdir"
echo "--> creating ./temp/"
mkdir --parents ./temp/

echo "--> pg_dump"
echo "--> dumping to ./temp/$dbname.sql"
pg_dump --host=localhost --port=5432 --dbname=$dbname --username=postgres --password --format=custom --compress=9 --file=./temp/$dbname.sql || true

echo "--> dropdb"
echo "--> dropping $dbname"
dropdb --host=localhost --port=5432 --username=postgres --password $dbname || true

echo "--> createdb"
echo "--> creating $dbname"
createdb --host=localhost --port=5432 --username=postgres --password $dbname

echo "--> psql"
echo "--> initializing $dbname"
psql --host=localhost --port=5432 --dbname=$dbname --username=postgres --password --echo-all --file=./scripts/postgresql_init.sql