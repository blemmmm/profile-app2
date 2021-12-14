DROP TABLE IF EXISTS "users" CASCADE;

CREATE TABLE "users" (
  "id" int4 PRIMARY KEY,
  "name" text,
  "email" text,
  "username" text,
  "password" text,
  "user_role" text,
  "user_created" double precision
);