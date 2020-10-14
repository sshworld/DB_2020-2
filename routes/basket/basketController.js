/**
 * listController
 *
 */

const db = require('../../config/dbConfig');

class basketController {

  // 장바구니 리스트
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

      let cartList = await db("SELECT b.BOOK_PATH, b.BOOK_NAME, b.BOOK_PUBLISH, b.BOOK_AUTHOR, b.BOOK_PRICE, cl.CART_COUNT, c.CART_UID, b.BOOK_UID, DATE_FORMAT(c.CREATED_AT, '%Y%m%d') AS CART_NUM, date_format(c.CREATED_AT, '%Y-%m-%d %T') AS CREATED_AT FROM CART c, BOOK b, CART_LIST cl WHERE c.CART_UID = cl.CART_UID AND b.BOOK_UID = cl.BOOK_UID AND c.USER_ID = ?", [userId])
      
      req.body.cartList = cartList

      next()

    } catch (error) {
      console.log(error)
    }
  }

  // 장바구니 담기
  async goBasket(req, res, next) {
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

      let cartCheck = await db("SELECT * FROM CART WHERE USER_ID = ?", [userId])

      if(cartCheck.length <= 0) {
        await db("INSERT INTO CART SET ?", {
          USER_ID: userId
        });
      }

      let cart = await db("SELECT * FROM CART WHERE USER_ID = ?", [userId])

      let putCart =  await db("INSERT INTO CART_LIST SET ?", {
          CART_UID : cart[0].CART_UID,
          BOOK_UID : BOOK_UID,
          CART_COUNT : count
        })

      if (putCart.errno == 1062) {
        await db("UPDATE CART_LIST SET CART_COUNT = (CART_COUNT + ?) WHERE BOOK_UID = ?", [count, BOOK_UID])
      }
      

      next()
      
    } catch (error) {
      console.log(error)
    }
  }

  // 장바구니 삭제
  async deleteList(req, res, next) {
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

      const CART_UID = req.params["cart"]
      const BOOK_UID = req.params["book"]

      let cartCheck = await db("SELECT * FROM CART_LIST WHERE CART_UID = ?", [CART_UID])

      if(cartCheck.length <= 1) {
        await db("DELETE FROM CART WHERE CART_UID = ? AND USER_ID = ?", [CART_UID, userId])
      }
      else {
        await db("DELETE FROM CART_LIST WHERE CART_UID = ? AND BOOK_UID = ?", [CART_UID, BOOK_UID])
      }
      
      
      next()

    } catch (error) {
      console.log(error)
    }
  }

  // 장바구니 주문
  async orderBasket(req, res, next) {
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
      const CART_UID = req.params["uid"]

      let myAddr = await db("SELECT * FROM ADDR_INFO WHERE USER_ID = ?", [userId]);
      let myCard = await db("SELECT * FROM CARD WHERE USER_ID = ?", [userId]);

      let orderBook = await db("SELECT c.CART_UID, c.CART_COUNT, b.BOOK_UID, b.BOOK_PATH, b.BOOK_NAME, b.BOOK_PUBLISH, b.BOOK_AUTHOR, b.BOOK_DETAIL, b.BOOK_PRICE, b.BOOK_COUNT FROM CART_LIST c, BOOK b WHERE CART_UID = ? AND b.BOOK_UID = c.BOOK_UID", [CART_UID])
      var count = []

      for(var i = 0; i < orderBook.length; i++) {
        count[i] = orderBook[i].CART_COUNT
        console.log(orderBook[i].BOOK_COUNT)
        if(count[i] > orderBook[i].BOOK_COUNT) {
          res.send(
            `<script type="text/javascript">
            alert("` + orderBook[i].BOOK_NAME + `의 수량이 장바구니에 담긴 수량보다 적습니다."); 
            location.href='/basket/basketList';
            </script>`
          );
        }
      }
      
      req.body.myAddr = myAddr
      req.body.myCard = myCard
      req.session.orderBook = orderBook
      req.session.count = count

      next()

    } catch (error) {
      console.log(error)

    }
  }

}

module.exports = basketController;
