import express from 'express';
import {join} from 'path';
import {getPool} from "./database.js";

const app = express();
const port = 3000;

app.use(express.static(join(process.cwd(), 'frontend')));

app.get('/counter', async (req, res) => {
    try {
        // Insert the fixed value
        await getPool().query('INSERT INTO counter (name) VALUES ($1)', [1]);
        // Get the total count
        const result = await getPool().query('SELECT COUNT(*) FROM counter');
        const count = parseInt(result.rows[0].count, 10);

        res.json({count: `${count}`});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Oops!"});
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
