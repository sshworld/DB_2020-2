/**
 * listController
 *
 */

const db = require("../../config/dbConfig");
var multer = require("multer"); //multer 모듈 import
var upload = multer({ dest: "public/images/book/" }); //업로드 경로 설정

class bookController {
  // 책 정보
  async bookInfo(req, res, next) {
    let bookInfo = await db("SELECT * FROM book");

    req.body.bookInfo = bookInfo;

    next();
  }

  // 책 추가
  // https://junspapa-itdev.tistory.com/27

  async addBook(req, res, next) {
    try {
      const BOOK_NAME = req.body.BOOK_NAME;
      const BOOK_PUBLISH = req.body.BOOK_PUBLISH;
      const BOOK_AUTHOR = req.body.BOOK_AUTHOR;
      const BOOK_DETAIL = req.body.BOOK_DETAIL;
      const BOOK_PRICE = req.body.BOOK_PRICE;
      const BOOK_COUNT = req.body.BOOK_COUNT;
      const BOOK_FILE = req.body.BOOK_FILE;

      if (
        BOOK_NAME == "" ||
        BOOK_PUBLISH == "" ||
        BOOK_AUTHOR == "" ||
        BOOK_DETAIL == "" ||
        BOOK_PRICE == "" ||
        BOOK_COUNT == ""
      ) {
        res.send(
          `<script type="text/javascript">
                alert("정보를 똑바로 입력하세요"); 
                location.href='/book';</script>`
        );
      } else {
        await db("INSERT INTO ADDR_INFO SET ?", {
          USER_ID: userId,
          SHIPPING_NUM: SHIPPING_NUM,
          BASIC_ADDR: BASIC_ADDR,
          DETAIL_ADDR: DETAIL_ADDR,
        });


        //multer 의 diskStorage를 정의
        var storage = multer.diskStorage({
          //경로 설정
          destination: function (req, file, cb) {
            cb(null, "publics/images/book/");
          },

          //실제 저장되는 파일명 설정
          filename: function (req, file, cb) {

            //Multer는 어떠한 파일 확장자도 추가하지 않습니다.
            //사용자 함수는 파일 확장자를 온전히 포함한 파일명을 반환해야 합니다.
            var mimeType = "jpg";

            cb(null, UID + "." + mimeType);
          },
        });

        var upload = multer({ storage: storage });

        next();
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = bookController;
