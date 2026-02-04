const pool = require('../config/db');

async function repairDB() {
    try {
        const connection = await pool.getConnection();
        console.log('🔌 Connected to database...');

        // Function to check if column exists
        const columnExists = async (tableName, columnName) => {
            const [rows] = await connection.query(`
                SELECT COUNT(*) as count 
                FROM information_schema.columns 
                WHERE table_schema = DATABASE() 
                AND table_name = ? 
                AND column_name = ?
            `, [tableName, columnName]);
            return rows[0].count > 0;
        };

        // 1. Check and add google_id
        if (!await columnExists('users', 'google_id')) {
            console.log('📝 Adding google_id column...');
            await connection.query('ALTER TABLE users ADD COLUMN google_id VARCHAR(255) NULL');
        } else {
            console.log('✅ google_id already exists');
        }

        // 2. Check and add facebook_id
        if (!await columnExists('users', 'facebook_id')) {
            console.log('📝 Adding facebook_id column...');
            await connection.query('ALTER TABLE users ADD COLUMN facebook_id VARCHAR(255) NULL');
        } else {
            console.log('✅ facebook_id already exists');
        }

        // 3. Check and add reset_token
        if (!await columnExists('users', 'reset_token')) {
            console.log('📝 Adding reset_token column...');
            await connection.query('ALTER TABLE users ADD COLUMN reset_token VARCHAR(255) NULL');
        } else {
            console.log('✅ reset_token already exists');
        }

        // 4. Check and add reset_token_expires
        if (!await columnExists('users', 'reset_token_expires')) {
            console.log('📝 Adding reset_token_expires column...');
            await connection.query('ALTER TABLE users ADD COLUMN reset_token_expires DATETIME NULL');
        } else {
            console.log('✅ reset_token_expires already exists');
        }

        // 5. Check and add avatar_url
        if (!await columnExists('users', 'avatar_url')) {
            console.log('📝 Adding avatar_url column...');
            await connection.query('ALTER TABLE users ADD COLUMN avatar_url VARCHAR(500) NULL');
        } else {
            console.log('✅ avatar_url already exists');
        }

        console.log('✅ Database repair completed successfully!');
        connection.release();
        process.exit(0);
    } catch (error) {
        console.error('❌ Repair failed:', error);
        process.exit(1);
    }
}

repairDB();
