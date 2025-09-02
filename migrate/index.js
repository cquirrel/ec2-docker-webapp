const migrate = require('node-pg-migrate');
const { Client } = require('pg');
const {readFile} = require('fs').promises;

async function _migrate() {
    const password = (await readFile('/run/secrets/db-master-password', 'utf8')).trim();

    console.log("Starting database migration...")
    console.log("Connecting to database...");

    const startTime = Date.now();
    let attempt = 0;
    let dbClient;
    while (true) {
        dbClient = new Client({
            user: "postgres",
            password: password,
            host: "db",
            port: 5432
        });

        try {
            await dbClient.connect();
            console.log("Connected to database.");
            break;
        } catch (err) {
            attempt++;
            const elapsed = Date.now() - startTime;
            if (elapsed > 30000) {
                console.error("Failed to connect to database after 30s", err);
                process.exit(1);
            }
            const delay = 5000;
            console.warn(`Connection failed (attempt ${attempt}), retrying in ${delay}ms...`);
            await new Promise(res => setTimeout(res, delay));
        }
    }

    console.log("Running migrations...");

    try {
        await migrate.runner({
            dbClient: dbClient,
            migrationsTable: "pg_migrations",
            dir: 'migrations',
            direction: 'up',
            log: console.log,
        });
        console.log('Migrations completed');
    } catch (err) {
        console.error('Migration failed', err);
        process.exit(1);
    }
}

(async function () {
    await _migrate();
})();
