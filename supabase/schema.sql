
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."Author" (
    "id" integer NOT NULL,
    "name" "text" NOT NULL,
    "bio" "text",
    "birthdate" timestamp(3) without time zone NOT NULL
);

ALTER TABLE "public"."Author" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."Author_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."Author_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."Author_id_seq" OWNED BY "public"."Author"."id";

CREATE TABLE IF NOT EXISTS "public"."Book" (
    "id" integer NOT NULL,
    "title" "text" NOT NULL,
    "description" "text",
    "published_date" timestamp(3) without time zone NOT NULL,
    "authorId" integer NOT NULL
);

ALTER TABLE "public"."Book" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."Book_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."Book_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."Book_id_seq" OWNED BY "public"."Book"."id";

CREATE TABLE IF NOT EXISTS "public"."_prisma_migrations" (
    "id" character varying(36) NOT NULL,
    "checksum" character varying(64) NOT NULL,
    "finished_at" timestamp with time zone,
    "migration_name" character varying(255) NOT NULL,
    "logs" "text",
    "rolled_back_at" timestamp with time zone,
    "started_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "applied_steps_count" integer DEFAULT 0 NOT NULL
);

ALTER TABLE "public"."_prisma_migrations" OWNER TO "postgres";

ALTER TABLE ONLY "public"."Author" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."Author_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."Book" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."Book_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."Author"
    ADD CONSTRAINT "Author_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."Book"
    ADD CONSTRAINT "Book_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."_prisma_migrations"
    ADD CONSTRAINT "_prisma_migrations_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."Book"
    ADD CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."Author"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

CREATE PUBLICATION "logflare_pub" WITH (publish = 'insert, update, delete, truncate');

ALTER PUBLICATION "logflare_pub" OWNER TO "supabase_admin";

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."Author" TO "anon";
GRANT ALL ON TABLE "public"."Author" TO "authenticated";
GRANT ALL ON TABLE "public"."Author" TO "service_role";

GRANT ALL ON SEQUENCE "public"."Author_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."Author_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."Author_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."Book" TO "anon";
GRANT ALL ON TABLE "public"."Book" TO "authenticated";
GRANT ALL ON TABLE "public"."Book" TO "service_role";

GRANT ALL ON SEQUENCE "public"."Book_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."Book_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."Book_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."_prisma_migrations" TO "anon";
GRANT ALL ON TABLE "public"."_prisma_migrations" TO "authenticated";
GRANT ALL ON TABLE "public"."_prisma_migrations" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
