const pool = require('../config/db');

async function initDB() {
    try {
        const connection = await pool.getConnection();
        console.log('🔌 Connected to database...');

        console.log('👷 Creating tables if not exist...');

        // 1. Cities
        await connection.query(`
            CREATE TABLE IF NOT EXISTS cities (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL UNIQUE,
                slug VARCHAR(100) NOT NULL UNIQUE
            )
        `);

        // 2. Categories
        await connection.query(`
            CREATE TABLE IF NOT EXISTS categories (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL UNIQUE
            )
        `);

        // 3. Places
        await connection.query(`
            CREATE TABLE IF NOT EXISTS places (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                slug VARCHAR(255) NOT NULL UNIQUE,
                city_id INT,
                category_id INT,
                description TEXT,
                quote VARCHAR(255),
                lat DECIMAL(10, 8),
                lng DECIMAL(11, 8),
                is_featured BOOLEAN DEFAULT FALSE,
                beliefs_text TEXT,
                video_url VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE SET NULL,
                FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
            )
        `);

        // 4. Place Photos
        await connection.query(`
            CREATE TABLE IF NOT EXISTS place_photos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                place_id INT,
                image_url VARCHAR(500) NOT NULL,
                is_primary BOOLEAN DEFAULT FALSE,
                FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE
            )
        `);

        // 5. Hotels
        await connection.query(`
            CREATE TABLE IF NOT EXISTS hotels (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                city_id INT,
                rating DECIMAL(2, 1),
                contact_number VARCHAR(50),
                map_link VARCHAR(500),
                FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE CASCADE
            )
        `);

        // 6. Users (Already done, but safe to repeat IF NOT EXISTS)
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                email VARCHAR(100) NOT NULL UNIQUE,
                password_hash VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log('✅ All tables initialized successfully!');
        connection.release();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error initializing database:', error);
        process.exit(1);
    }
}

initDB();
