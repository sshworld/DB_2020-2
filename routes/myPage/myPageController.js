/**
 * myPageController
 *
 */

const db = require("../../config/dbConfig");

class myPageController {
  async myInfo(req, res, next) {
    const userId = req.params["id"];

    let myAddr = await db("SELECT * FROM ADDR_INFO WHERE USER_ID = ?", [userId]);

    req.body.myAddr = myAddr

    next()
  }

  async createCard(req, res, next) {
    next();
  }

  async createAddr(req, res, next) {
    try {

        const userId = req.params["id"];
        const SHIPPING_NUM = req.body.SHIPPING_NUM;
        const BASIC_ADDR = req.body.BASIC_ADDR;
        const DETAIL_ADDR = req.body.DETAIL_ADDR;

        if (SHIPPING_NUM == '' || BASIC_ADDR == '' || DETAIL_ADDR == '') {
            res.send(
                `<script type="text/javascript">
                alert("정보를 똑바로 입력하세요"); 
                location.href='/myPage/:` +
                userId +
                `/addAddr';</script>`
            );
        } else {
            await db("INSERT INTO ADDR_INFO SET ?", {
                USER_ID: userId,
                SHIPPING_NUM: SHIPPING_NUM,
                BASIC_ADDR: BASIC_ADDR,
                DETAIL_ADDR: DETAIL_ADDR
            });

            next();
        }

    } catch (error) {
        console.log(error)
    }
  }
}

module.exports = myPageController;
