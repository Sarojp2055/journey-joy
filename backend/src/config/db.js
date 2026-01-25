const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// Create a connection pool to the database
let pool;

if (process.env.DATABASE_URL) {
  const dbUrl = new URL(process.env.DATABASE_URL);
  console.log('📡 [DB DIAGNOSTIC] Attempting connection via DATABASE_URL');
  console.log(`📡 [DB DIAGNOSTIC] Host: ${dbUrl.hostname}, Port: ${dbUrl.port || 3306}, Database: ${dbUrl.pathname.slice(1)}, User: ${dbUrl.username}`);

  pool = mysql.createPool({
    host: dbUrl.hostname,
    user: dbUrl.username,
    password: decodeURIComponent(dbUrl.password),
    database: dbUrl.pathname.slice(1),
    port: dbUrl.port || 3306,
    ssl: {
      rejectUnauthorized: false
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
} else if (process.env.DB_HOST) {
  console.log('🏠 [DB DIAGNOSTIC] Attempting connection via Individual Env Vars');
  console.log(`🏠 [DB DIAGNOSTIC] Host: ${process.env.DB_HOST}, Port: ${process.env.DB_PORT || 25060}, Database: ${process.env.DB_NAME}, User: ${process.env.DB_USER}`);
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
  console.error('❌ [DB DIAGNOSTIC] FATAL: No database configuration found!');
  console.error('   - DATABASE_URL environment variable is missing.');
  pool = {
    query: () => { throw new Error('Database not configured. Check environment variables.'); },
    getConnection: () => Promise.reject(new Error('Database not configured. Check environment variables.'))
  };
}

module.exports = pool;
