DROP TABLE IF EXISTS "users" CASCADE;

CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "name" text,
  "email" text,
  "username" text,
  "password" text,
  "user_role" text,
  "user_created" double precision
);

-- CREATE TABLE "profile" (
--   "time_updated" double precision NULL,
--   "user_id" integer NULL,
--   "profile_img" text NULL,
--   "favorites" text NULL,
--   "about_me" text NULL,
--   "bio" text NULL,
--   "id" integer NOT NULL
-- );
-- ALTER TABLE
--   public.profile
-- ADD
--   CONSTRAINT "profile_pkey" PRIMARY KEY (id)
