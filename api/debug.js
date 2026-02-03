module.exports = (req, res) => {
    try {
        const app = require('../backend/src/server.js');
        if (typeof app === 'function') {
            return app(req, res);
        } else {
            res.status(500).json({ error: 'server.js did not export a function', type: typeof app });
        }
    } catch (err) {
        res.status(500).json({
            error: 'Failed to load server.js',
            message: err.message
        });
    }
};
