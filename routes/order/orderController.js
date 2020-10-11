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
      const count = req.params["value"]

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
          BOOK_COUNT : count[i]
          
        });

        await db("UPDATE BOOK SET BOOK_COUNT = (BOOK_COUNT - ?) WHERE BOOK_UID = ?", [count[i], orderBook[i].BOOK_UID])

      }

      next();
    } catch (error) {

    }
  }

  async orderList(req, res, next) {
    try {

      const userId = req.params["id"]

      let orderList = await db("SELECT o.ORDER_ID, b.BOOK_NAME, o.CREATED_AT, o.ORDER_AMOUNT FROM BOOK b, ORDERED o, ORDER_LIST ol WHERE b.BOOK_UID = ol.BOOK_UID AND ol.ORDER_ID = o.ORDER_ID AND o.USER_ID = ? ORDER BY ORDER_ID DESC", [userId])
      
      
    } catch (error) {

    }
  }


}

module.exports = orderController;