const pool = require('../config/db');

async function migrate() {
    try {
        const connection = await pool.getConnection();
        console.log('🔌 Connected to database...');
        console.log('🔄 Running Auth Enhancement Migration...');

        // 1. Add OAuth and reset columns to users table
        console.log('📝 Updating users table...');
        try {
            await connection.query(`
                ALTER TABLE users 
                ADD COLUMN IF NOT EXISTS google_id VARCHAR(255) NULL,
                ADD COLUMN IF NOT EXISTS facebook_id VARCHAR(255) NULL,
                ADD COLUMN IF NOT EXISTS reset_token VARCHAR(255) NULL,
                ADD COLUMN IF NOT EXISTS reset_token_expires DATETIME NULL,
                ADD COLUMN IF NOT EXISTS avatar_url VARCHAR(500) NULL
            `);
        } catch (e) {
            // MySQL doesn't support IF NOT EXISTS for ADD COLUMN, handle gracefully
            console.log('⚠️ Some columns may already exist, continuing...');
        }

        // 2. Create user_favorites table
        console.log('📝 Creating user_favorites table...');
        await connection.query(`
            CREATE TABLE IF NOT EXISTS user_favorites (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                place_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE KEY unique_favorite (user_id, place_id),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE
            )
        `);

        // 3. Create user_visits table
        console.log('📝 Creating user_visits table...');
        await connection.query(`
            CREATE TABLE IF NOT EXISTS user_visits (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                place_id INT NOT NULL,
                visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE KEY unique_visit (user_id, place_id),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE
            )
        `);

        console.log('✅ Auth Enhancement Migration Completed Successfully!');
        connection.release();
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

migrate();
