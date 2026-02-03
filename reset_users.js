const pool = require('./backend/src/config/db');

async function resetUsers() {
    try {
        console.log('Resetting users table...');
        await pool.query('DELETE FROM users');
        // valid way to reset auto_increment in mysql is truncate, but foreign keys might prevent it. 
        // If delete works, that's enough for "deleting credentials".
        // await pool.query('TRUNCATE TABLE users'); 
        console.log('All user credentials have been deleted.');
        process.exit(0);
    } catch (err) {
        console.error('Error deleting users:', err);
        process.exit(1);
    }
}

resetUsers();
