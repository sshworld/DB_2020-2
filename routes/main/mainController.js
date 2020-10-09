/**
 * Visit API
 *
 */

const db = require('../../config/dbConfig');

class mainController {
  async init(req, res, next) {
    try {

      let bookInfo = await db("SELECT * FROM BOOK");

      req.body.bookInfo = bookInfo

      next();

    } catch (error) {
      console.log(error);
    }
  }

  // 책 검색
  async searchBook(req, res, next) {
    try {

      const bookName = '%' + req.params['bookName'] + '%'

      const searchBook = await db("SELECT * FROM BOOK WHERE BOOK_NAME LIKE ?", [bookName]);
      req.body.searchInfo = searchBook;
      next();

    } catch (error) {
      console.log(error)
    }
  }

}

module.exports = mainController;