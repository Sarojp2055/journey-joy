const pool = require('./backend/src/config/db');

async function checkSchema() {
    try {
        console.log('Checking users table schema...');
        const [rows] = await pool.query('DESCRIBE users');
        console.log('Columns:', rows.map(r => r.Field));
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

checkSchema();
