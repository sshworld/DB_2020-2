/**
 * Visit API
 *
 */

const express = require("express");
const router = express.Router();
const bookController = require("./bookController");
const book = new bookController();
const multer = require("multer"); //multer 모듈 import
//multer 의 diskStorage를 정의
const storage = multer.diskStorage({
    //경로 설정
    destination: function (req, file, cb) {
      cb(null, "public/images/book/");
    },

    //실제 저장되는 파일명 설정
    filename: function (req, file, cb) {

      //Multer는 어떠한 파일 확장자도 추가하지 않습니다.
      //사용자 함수는 파일 확장자를 온전히 포함한 파일명을 반환해야 합니다.
      var mimeType = "jpg";

      const now = Date.now()

      cb(null, now + "." + mimeType);
    },
  });
const upload = multer({
    storage: storage
  });

//---------------------------------------라우터-----------------------------------------

// 책 리스트
router.get('/list', book.bookInfo, (req, res) => {
    var sess = req.session.USER_ID;
    const bookInfo = req.body.bookInfo
    res.render('index.ejs', {pages: './book/bookList.ejs', sess : sess, bookInfo:bookInfo});
});

// 책 추가
router.get('/addBook', (req, res) => {
    var sess = req.session.USER_ID;
    res.render('index.ejs', {pages: './book/addBook.ejs', sess : sess});
});

router.post('/additionBook', upload.single('BOOK_FILE'), book.addBook, (req, res) => {
    res.send(`<script type="text/javascript"> alert("책 등록 성공"); location.href='/book/list';</script>`);
});

// 책 수정
router.get("/:uid/book", (req, res) => {
  var sess = req.session.USER_ID;
  var userName = req.session.USER_NAME;
  const uid = req.params["uid"];
  
  res.render("index.ejs", {
    pages: "./book/updateBook.ejs",
    sess: sess,
    userName: userName,
    uid: uid
  });
})

router.post("/:uid/updateBook", upload.single('BOOK_FILE'), book.updateBook, (req, res) => {
  res.send(
    `<script type="text/javascript"> alert("책 수정 성공"); location.href='/book/list';</script>`
  );
});

// 책 삭제
router.get('/:uid/deleteBook', book.deleteBook, (req, res) => {
  res.send(`<script type="text/javascript"> alert("책 삭제 성공"); location.href='/book/list';</script>`);
})

// 책 상세정보
router.get('/:uid/detail', book.bookDetail, (req, res) => {
  var sess = req.session.USER_ID;
  var userName = req.session.USER_NAME;
  const detailBook = req.body.detailBook[0]
  res.render("index.ejs", {pages: "./book/bookDetail.ejs", sess: sess, userName: userName, detailBook:detailBook})
})
module.exports = router;
