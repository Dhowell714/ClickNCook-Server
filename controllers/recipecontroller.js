const Express = require("express");
const router = Express.Router();

router.get('/practice', (req, res) => {
    res.send('Hey! This be practice!')
});

module.exports = router;