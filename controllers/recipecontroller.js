const Express = require("express");
const router = Express.Router();

router.get('/practice', (req, res) => {
    
    res.status(200).json({ message: 'Hey! This  practice!'})
});
// 11
module.exports = router;