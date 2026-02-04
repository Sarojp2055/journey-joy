const pool = require('../config/db');

async function createUsersTable() {
    try {
        const connection = await pool.getConnection();
        console.log('🔌 Connected to database...');

        console.log('👷 Creating users table...');
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                email VARCHAR(100) NOT NULL UNIQUE,
                password_hash VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log('✅ Users table created successfully');
        connection.release();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating users table:', error);
        process.exit(1);
    }
}

createUsersTable();
