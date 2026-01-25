const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// Create a connection pool to the database
let pool;

if (process.env.DATABASE_URL) {
  console.log('📡 Decomposing DATABASE_URL for secure connection');

  // Use modern URL API instead of deprecated url.parse()
  const dbUrl = new URL(process.env.DATABASE_URL);

  pool = mysql.createPool({
    host: dbUrl.hostname,
    user: dbUrl.username,
    password: decodeURIComponent(dbUrl.password),
    database: dbUrl.pathname.slice(1), // Remove leading '/'
    port: dbUrl.port || 3306,
    ssl: {
      rejectUnauthorized: false
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
} else if (process.env.DB_HOST) {
  console.log('🏠 Using individual DB environment variables');
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 25060,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  console.error('❌ No database configuration found! Set DATABASE_URL or DB_HOST/DB_USER/etc.');
  // Create a dummy pool that will fail on use to avoid crashing immediately but provide clear error
  pool = {
    query: () => { throw new Error('Database not configured. Check environment variables.'); },
    getConnection: () => Promise.reject(new Error('Database not configured. Check environment variables.'))
  };
}

module.exports = pool;
