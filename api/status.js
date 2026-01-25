module.exports = async (req, res) => {
    res.status(200).json({
        message: 'API is working!',
        env_check: {
            DATABASE_URL_exists: !!process.env.DATABASE_URL,
            DATABASE_URL_length: process.env.DATABASE_URL ? process.env.DATABASE_URL.length : 0,
            NODE_ENV: process.env.NODE_ENV,
            timestamp: new Date().toISOString()
        }
    });
};
