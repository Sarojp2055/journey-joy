const mysql = require('mysql2/promise');
require('dotenv').config();

// Create a connection pool to the database
let pool;

if (process.env.DATABASE_URL) {
  console.log('📡 Decomposing DATABASE_URL for secure connection');
  const url = require('url');
  const dbConfig = url.parse(process.env.DATABASE_URL);
  const [user, password] = dbConfig.auth.split(':');

  pool = mysql.createPool({
    host: dbConfig.hostname,
    user: user,
    password: password,
    database: dbConfig.pathname.split('/')[1],
    port: dbConfig.port || 3306,
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
    getConnection: () => { throw new Error('Database not configured. Check environment variables.'); }
  };
}

module.exports = pool;
