const pool = require('./backend/src/config/db');

async function migrate() {
    try {
        console.log('Running migration...');
        await pool.query(`
            ALTER TABLE users 
            ADD COLUMN security_question VARCHAR(255),
            ADD COLUMN security_answer_hash VARCHAR(255)
        `);
        console.log('Migration successful: Columns added.');
        process.exit(0);
    } catch (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
            console.log('Columns already exist.');
        } else {
            console.error('Migration failed:', err);
        }
        process.exit(1);
    }
}

migrate();
