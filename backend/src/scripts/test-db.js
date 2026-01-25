const pool = require('../config/db');

async function testConnection() {
    try {
        const [rows] = await pool.query('SELECT 1 as val');
        console.log('✅ Database Connection Successful! Value:', rows[0].val);
        process.exit(0);
    } catch (err) {
        console.error('❌ Database Connection Failed:', err.message);
        process.exit(1);
    }
}

testConnection();
