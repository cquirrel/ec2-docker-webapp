import express from 'express';
import { Pool } from 'pg';

console.log(process.env)

const app = express();
const port = 3000;
const pool = new Pool()

// Simple API endpoint
app.get('/', async (req, res) => {
    try {
        // Insert the fixed value
        await pool.query('INSERT INTO counter (name) VALUES ($1)', [1]);
        // Get the total count
        const result = await pool.query('SELECT COUNT(*) FROM counter');
        const count = parseInt(result.rows[0].count, 10);

        res.json({ count });
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Oops!"});
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
