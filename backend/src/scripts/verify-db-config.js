const mysql = require('mysql2/promise');
require('dotenv').config();
const url = require('url');

async function test() {
    console.log('--- DB Config Test ---');
    console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);

    if (process.env.DATABASE_URL) {
        try {
            const dbConfig = url.parse(process.env.DATABASE_URL);
            const [user, password] = dbConfig.auth.split(':');
            const config = {
                host: dbConfig.hostname,
                user: user,
                password: password,
                database: dbConfig.pathname.split('/')[1],
                port: dbConfig.port || 3306,
                ssl: { rejectUnauthorized: false }
            };
            console.log('Parsed Config (no password):', { ...config, password: '****' });

            const conn = await mysql.createConnection(config);
            console.log('✅ Connection successful!');
            await conn.end();
        } catch (err) {
            console.error('❌ Connection failed:', err.message);
        }
    }
}

test();
