/**
 * listController
 *
 */

const db = require('../../config/dbConfig');

class basketController {
  async basketList(req, res, next) {
    
    try {

      if (req.session.USER_ID == null) {
        res.send(
          `<script type="text/javascript">
          alert("로그인을 하세요"); 
          location.href='/users/login';
          </script>`
        );
      }

      const userId = req.session.USER_ID

      let orderList = await db("SELECT ORDER_ID, BOOK_NAME, DATE_FORMAT(CREATED_AT, '%y-%m-%d') AS CREATED_AT, DATE_FORMAT(CREATED_AT, '%Y%m%d') AS ORDER_NUM ,ORDER_AMOUNT, RANKING, TOTAL FROM ( SELECT o.ORDER_ID, BOOK_NAME, o.CREATED_AT, o.ORDER_AMOUNT, (SELECT COUNT(BOOK_UID) FROM ORDER_LIST WHERE ORDER_ID = o.ORDER_ID) AS TOTAL ,@RANKT := IF(o.ORDER_ID > @LAST , @RANK := @RANK + 1, 0) AS RANKING ,@LAST := o.ORDER_ID FROM (SELECT @RANK := 0, @LAST := 0) XX, ORDERED AS o LEFT OUTER JOIN(SELECT ol.ORDER_ID, b.BOOK_NAME FROM ORDER_LIST ol LEFT OUTER JOIN BOOK b ON b.BOOK_UID = ol.BOOK_UID) AS b ON b.ORDER_ID = o.ORDER_ID WHERE o.USER_ID = ? ORDER BY ORDER_ID ASC) t WHERE RANKING != 0", [userId])
      
      req.body.orderList = orderList

      next()

    } catch (error) {
      console.log(error)
    }
  }

  async ba
}

module.exports = basketController;
