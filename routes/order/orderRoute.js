/**
 * Visit API
 *
 */

const express = require("express");
const router = express.Router();
const orderController = require("./orderController");
const order = new orderController();

router.get('/:id', (req, res) => {
    var sess = req.session.USER_ID;
    var userName = req.session.USER_NAME;
    res.render('index.ejs', {pages: './home/main.ejs', sess : sess, userName : userName});
});


module.exports = router;
