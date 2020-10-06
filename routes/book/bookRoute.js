/**
 * Visit API
 *
 */

const express = require("express");
const router = express.Router();
const bookController = require("./bookController");
const basket = new bookController();

router.get('/', (req, res) => {
    var sess = req.session.USER_ID;
    var userName = req.session.USER_NAME;
    res.render('index.ejs', {pages: './book/bookList.ejs', sess : sess, userName : userName});
});


module.exports = router;
