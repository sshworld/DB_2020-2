/**
 * orderController
 *
 */

const db = require('../../config/dbConfig');

class orderController {

  // 책 상세에서 주문
  async singleOrder(req, res, next) {

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
      const BOOK_UID = req.params["uid"]
      const count = req.params["index"]

      let myAddr = await db("SELECT * FROM ADDR_INFO WHERE USER_ID = ?", [userId]);
      let myCard = await db("SELECT * FROM CARD WHERE USER_ID = ?", [userId]);

      let orderBook = await db("SELECT * FROM BOOK WHERE BOOK_UID = ?", [BOOK_UID])


      req.body.myAddr = myAddr
      req.body.myCard = myCard
      req.session.orderBook = orderBook
      req.session.count = count

      next()

    } catch (error) {
      console.log(error)

    }
  }

  // 책 구매하기
  async purchase(req, res, next) {

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
      const ADDR_UID = req.body.ADDR_UID
      const CARD_ID = req.body.CARD_ID
      const orderBook = req.session.orderBook
      const count = req.session.count
      const amount = req.body.amount

      let userAddr = await db("SELECT * FROM ADDR_INFO WHERE ADDR_UID = ?", [ADDR_UID])
      let userCard = await db("SELECT * FROM CARD WHERE CARD_ID = ?", [CARD_ID])

      const addr = userAddr[0]
      const card = userCard[0]


      await db("INSERT INTO ORDERED SET ?", {
        USER_ID: userId,
        SHIPPING_NUM: addr.SHIPPING_NUM,
        BASIC_ADDR: addr.BASIC_ADDR,
        DETAIL_ADDR: addr.DETAIL_ADDR,
        CARD_ID: card.CARD_ID,
        CARD_DATE: card.CARD_DATE,
        CARD_TYPE: card.CARD_TYPE,
        ORDER_AMOUNT : amount
        
      });


      let orderUid = await db("SELECT ORDER_ID FROM ORDERED ORDER BY ORDER_ID DESC LIMIT 1")


      for (var i = 0; i < orderBook.length; i++) {
        await db("INSERT INTO ORDER_LIST SET ?", {
          ORDER_ID : orderUid[0].ORDER_ID,
          BOOK_UID : orderBook[i].BOOK_UID,
          ORDER_COUNT : count[i]
          
        });

        await db("UPDATE BOOK SET BOOK_COUNT = (BOOK_COUNT - ?) WHERE BOOK_UID = ?", [count[i], orderBook[i].BOOK_UID])

      }

      next();
    } catch (error) {

    }
  }

  // 주문 목록
  async orderList(req, res, next) {
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

  // 주문 상세 목록
  async detailList(req, res, next) {
    
    try {
      if (req.session.USER_ID == null) {
        res.send(
          `<script type="text/javascript">
          alert("로그인을 하세요"); 
          location.href='/users/login';
          </script>`
        );
      }

      const userId = req.params["id"]
      const ORDER_ID = req.params["uid"]

      let orderDetail = await db("SELECT ol.ORDER_ID, ol.BOOK_UID, DATE_FORMAT(ol.CREATED_AT, '%Y-%m-%d %T') AS CREATED_AT, DATE_FORMAT(ol.CREATED_AT, '%Y%m%d') AS ORDER_NUM, ol.ORDER_COUNT, b.BOOK_PATH, b.BOOK_NAME, b.BOOK_PRICE, b.BOOK_PUBLISH, b.BOOK_AUTHOR FROM ORDER_LIST ol, BOOK b WHERE ol.BOOK_UID = b.BOOK_UID AND ol.ORDER_ID = ?", [ORDER_ID])

      let orderInfo = await db("SELECT * FROM ORDERED WHERE USER_ID = ? AND ORDER_ID = ?", [userId, ORDER_ID])

      req.body.orderDetail = orderDetail
      console.log(orderDetail)
      req.body.orderInfo = orderInfo[0]

      next()

    } catch (error) {
      console.log(error)
    }

  }

  // 주문 취소
  async cancleOrder(req, res, next) {
    try {

      const ORDER_ID = req.params["uid"]

      let cancleOrder = await db("SELECT * FROM ORDER_LIST WHERE ORDER_ID = ?", [ORDER_ID])

      for(var i = 0; i < cancleOrder.length; i++) {
        await db("UPDATE BOOK SET BOOK_COUNT = (BOOK_COUNT + ?) WHERE BOOK_UID = ?", [cancleOrder[i].ORDER_COUNT, cancleOrder[i].BOOK_UID])
        await db("DELETE FROM ORDER_LIST WHERE ORDER_ID = ? AND BOOK_UID = ?", [ORDER_ID, cancleOrder[i].BOOK_UID])
      }
      
      await db("DELETE FROM ORDERED WHERE ORDER_ID = ?", [ORDER_ID])

      next()
    } catch (error) {
      console.log(error)
    }
  }


}

module.exports = orderController;