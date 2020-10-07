/**
 * Visit API
 *
 */

const express = require("express");
const router = express.Router();
const bookController = require("./bookController");
const book = new bookController();

router.get('/', book.bookInfo, (req, res) => {
    var sess = req.session.USER_ID;
    const bookInfo = req.body.bookInfo
    res.render('index.ejs', {pages: './book/bookList.ejs', sess : sess, book:bookInfo});
});

router.get('/addBook', (req, res) => {
    var sess = req.session.USER_ID;
    res.render('index.ejs', {pages: './book/addBook.ejs', sess : sess});
});

router.post('/additionBook', book.addBook, (req, res) => {
    res.send(`<script type="text/javascript"> alert("책 등록 성공"); location.href='/book/';</script>`);
});


module.exports = router;
