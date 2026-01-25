module.exports = async (req, res) => {
    let debugInfo = {
        phase: 'init',
        mysql2_loadable: false,
        env_exists: !!process.env.DATABASE_URL
    };

    try {
        debugInfo.phase = 'loading_mysql2';
        const mysql = require('mysql2/promise');
        debugInfo.mysql2_loadable = true;

        debugInfo.phase = 'creating_connection';
        // Aiven MySQL usually works with this config
        const connection = await mysql.createConnection({
            uri: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            },
            connectTimeout: 10000
        });

        debugInfo.phase = 'executing_query';
        const [rows] = await connection.execute('SELECT 1 as val');

        debugInfo.phase = 'closing_connection';
        await connection.end();

        res.status(200).json({
            success: true,
            status: 'healthy',
            debug: debugInfo,
            result: rows[0]
        });
    } catch (error) {
        res.status(200).json({
            success: false,
            status: 'error',
            error: error.message,
            code: error.code,
            stack: error.stack,
            debug: debugInfo
        });
    }
};
