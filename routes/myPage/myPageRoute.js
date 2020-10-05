/**
 * Visit API
 *
 */

const express = require("express");
const router = express.Router();
const myPageController = require("./myPageController");
const myPage = new myPageController();

router.get('/:id', (req, res) => {
    var sess = req.session.USER_ID;
    var userName = req.session.USER_NAME;
    res.render('index.ejs', {pages: './myPage/myPage.ejs', sess : sess, userName : userName});
});


module.exports = router;
