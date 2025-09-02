#!/bin/bash
set -e

echo "Creating app user..."

# Read password from Docker secret or env
APP_PASS=$(cat /run/secrets/db-app-password)

psql -v ON_ERROR_STOP=1 <<-EOSQL
    CREATE USER web WITH PASSWORD '${APP_PASS}';
    GRANT CONNECT ON DATABASE ${POSTGRES_DB} TO web;
    GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO web;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public
        GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO web;
EOSQL

