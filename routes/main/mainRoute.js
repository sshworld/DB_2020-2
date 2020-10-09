/**
 * Visit API
 *
 */

const express = require("express");
const router = express.Router();
const mainController = require("./mainController");
const main = new mainController();

router.get('/',main.init, (req, res) => {
    var sess = req.session.USER_ID;
    var userName = req.session.USER_NAME;
    const bookInfo = req.body.bookInfo
    res.render('index.ejs', {pages: './home/main.ejs', sess : sess, userName : userName, bookInfo:bookInfo});
});

router.post('/', (req, res) => {
  res.send(`<script type="text/javascript">
  location.href='/` + req.body.bookName + `';
  </script>`)
});

// 책 검색
router.get('/:bookName', main.searchBook, (req, res) => {
    var sess = req.session.USER_ID;
    var userName = req.session.USER_NAME;
    const searchInfo = req.body.searchInfo
    res.render('index.ejs', {pages: './home/main.ejs', sess : sess, userName : userName, bookInfo: searchInfo});
  })
  


module.exports = router;
