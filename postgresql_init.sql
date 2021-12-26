DROP TABLE IF EXISTS "users" CASCADE;

CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "name" text,
  "email" text,
  "username" text,
  "password" text,
  "user_role" text,
  "user_created" double precision, 
  "time_updated" double precision,
  "about_me" text,
  "favorites" text,
  "bio" text
);
