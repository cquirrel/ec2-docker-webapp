import {readFileSync} from "fs";
import {Pool} from "pg";

let pool;

export function getPool() {
    if (!pool) {
        const password = readFileSync('/run/secrets/db-app-password', 'utf8').trim();
        pool = new Pool({
            user: "web",
            host: "database",
            database: "postgres",
            password
        });
    }
    return pool;
}