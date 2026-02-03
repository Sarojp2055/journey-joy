const mysql = require('mysql2/promise');

module.exports = async (req, res) => {
    try {
        if (!process.env.DATABASE_URL) throw new Error('No DATABASE_URL environment variable');
        const dbUrl = new URL(process.env.DATABASE_URL);

        const connection = await mysql.createConnection({
            host: dbUrl.hostname,
            user: dbUrl.username,
            password: dbUrl.password,
            database: dbUrl.pathname.slice(1),
            port: dbUrl.port || 3306,
            ssl: { rejectUnauthorized: false }
        });

        const [rows] = await connection.execute('SELECT 1 as val');
        await connection.end();

        res.json({ status: 'ok', val: rows[0].val, dbHost: dbUrl.hostname });
    } catch (err) {
        res.status(500).json({ error: err.message, stack: err.stack });
    }
};
