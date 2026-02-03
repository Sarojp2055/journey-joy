const db = require('../backend/src/config/db.js');
module.exports = (req, res) => {
    res.json({ message: 'Backend config loaded', type: typeof db });
};
