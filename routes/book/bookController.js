/**
 * listController
 *
 */

const db = require("../../config/dbConfig");

class bookController {
  // 책 정보
  async bookInfo(req, res, next) {

    try {

      let bookInfo = await db("SELECT * FROM BOOK");

      req.body.bookInfo = bookInfo

      next();

    } catch (error) {
      console.log(error);
    }
  }

  // 책 추가
  // https://junspapa-itdev.tistory.com/27

  async addBook(req, res, next) {
    try {

      const BOOK_NAME = req.body.BOOK_NAME;
      const BOOK_PATH = req.file.filename;
      const BOOK_PUBLISH = req.body.BOOK_PUBLISH;
      const BOOK_AUTHOR = req.body.BOOK_AUTHOR;
      const BOOK_DETAIL = req.body.BOOK_DETAIL;
      const BOOK_PRICE = req.body.BOOK_PRICE;
      const BOOK_COUNT = req.body.BOOK_COUNT;



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
        await db("INSERT INTO BOOK SET ?", {
          BOOK_NAME: BOOK_NAME,
          BOOK_PATH: BOOK_PATH,
          BOOK_PUBLISH: BOOK_PUBLISH,
          BOOK_AUTHOR: BOOK_AUTHOR,
          BOOK_DETAIL: BOOK_DETAIL,
          BOOK_PRICE: BOOK_PRICE,
          BOOK_COUNT: BOOK_COUNT
        });

        next();
      }
    } catch (error) {
      console.log(error);
    }
  }

  // 책 수정

  async updateBook(req, res, next) {
    try {

      const BOOK_UID = req.params["uid"];
      const BOOK_NAME = req.body.BOOK_NAME;
      const BOOK_PATH = req.file.filename;
      const BOOK_PUBLISH = req.body.BOOK_PUBLISH;
      const BOOK_AUTHOR = req.body.BOOK_AUTHOR;
      const BOOK_DETAIL = req.body.BOOK_DETAIL;
      const BOOK_PRICE = req.body.BOOK_PRICE;
      const BOOK_COUNT = req.body.BOOK_COUNT;

      if (BOOK_NAME == "" ||
        BOOK_PUBLISH == "" ||
        BOOK_AUTHOR == "" ||
        BOOK_DETAIL == "" ||
        BOOK_PRICE == "" ||
        BOOK_COUNT == "") {
        res.send(
          `<script type="text/javascript">
                alert("정보를 똑바로 입력하세요"); 
                location.href='/book';</script>`
        );
      } else {
        await db("UPDATE BOOK SET BOOK_NAME = ?, BOOK_PATH = ?, BOOK_PUBLISH = ?, BOOK_AUTHOR = ?, BOOK_DETAIL = ?, BOOK_PRICE = ?, BOOK_COUNT = ?  WHERE BOOK_UID = ?", [BOOK_NAME, BOOK_PATH, BOOK_PUBLISH, BOOK_AUTHOR, BOOK_DETAIL, BOOK_PRICE, BOOK_COUNT, BOOK_UID]);

        next();
      }

    } catch (error) {
      console.log(error);
    }
  }

  // 책 삭제

  async deleteBook(req, res, next) {
    try {

      const BOOK_UID = req.params["uid"];

      await db("DELETE FROM BOOK WHERE BOOK_UID = ?", [BOOK_UID]);
      next();

    } catch (error) {
      console.log(error)
    }

  }

  // 책 상세정보

  async bookDetail(req, res, next) {
    try {

      const BOOK_UID = req.params["uid"];

      let detailBook = await db("SELECT * FROM BOOK WHERE BOOK_UID = ?", [BOOK_UID]);

      req.body.detailBook = detailBook
      next();

    } catch (error) {
      console.log(error)
    }
  }


}

module.exports = bookController;