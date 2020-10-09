/**
 * orderController
 *
 */

const db = require('../../config/dbConfig');

class orderController {
  async hello(req, res, next) {

    try {

      if(req.session.USER_ID == null) {
        res.send(
          `<script type="text/javascript">
          alert("로그인을 하세요"); 
          location.href='/users/login';
          </script>`
      );
      }

      const userId = req.session.USER_ID
      
      let myAddr = await db("SELECT * FROM ADDR_INFO WHERE USER_ID = ?", [userId]);
      let myCard = await db("SELECT * FROM CARD WHERE USER_ID = ?", [userId]);

      req.body.myAddr = myAddr
      req.body.myCard = myCard

      next()

    } catch (error) {
      console.log(error)
      
    }
  }
}

module.exports = orderController;