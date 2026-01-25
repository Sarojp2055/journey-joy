
module.exports = (req, res) => {
    res.json({
        url: req.url,
        active_phase: 'debugging_url_stripping'
    });
};
