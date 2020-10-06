/**
 * myPageController
 *
 */

const db = require("../../config/dbConfig");

class myPageController {
  // 마이페이지 내 정보
  async myInfo(req, res, next) {
    const userId = req.params["id"];

    let myAddr = await db("SELECT * FROM ADDR_INFO WHERE USER_ID = ?", [userId]);
    let myCard = await db("SELECT * FROM CARD WHERE USER_ID = ?", [userId]);

    req.body.myAddr = myAddr
    req.body.myCard = myCard

    next()
  }

  // 주소 추가
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
                location.href='/myPage/` +
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

  // 주소 수정
  async updateAddr(req, res, next) {
    try {

      const userId = req.params["id"];
      const ADDR_UID = req.params["uid"];
      const SHIPPING_NUM = req.body.SHIPPING_NUM;
      const BASIC_ADDR = req.body.BASIC_ADDR;
      const DETAIL_ADDR = req.body.DETAIL_ADDR;

      if (SHIPPING_NUM == '' || BASIC_ADDR == '' || DETAIL_ADDR == '') {
        res.send(
          `<script type="text/javascript">
                alert("정보를 똑바로 입력하세요"); 
                location.href='/myPage/` +
          userId +
          `/addAddr';</script>`
        );
      } else {
        await db("UPDATE ADDR_INFO SET SHIPPING_NUM = ?, BASIC_ADDR = ?, DETAIL_ADDR = ? WHERE ADDR_UID = ?", [SHIPPING_NUM, BASIC_ADDR, DETAIL_ADDR, ADDR_UID]);

        next();
      }

    } catch (error) {
      console.log(error)
    }
  }

  // 주소 삭제
  async deleteAddr(req, res, next) {
    try {

      const userId = req.params["id"];
      const ADDR_UID = req.params["uid"];

      async function confirm() {
        return `<script type="text/javascript"> confirm("정말 삭제하시겠습니까?")</script>`
      }

      if (confirm() == true) {
        await db("DELETE FROM ADDR_INFO WHERE ADDR_UID = ?", [ADDR_UID]);
        next();

      } else {

        res.send(
          `<script type="text/javascript">
                alert("정보를 똑바로 입력하세요"); 
                location.href='/myPage/` +
          userId +
          `';</script>`
        );
      }

    } catch (error) {
      console.log(error)
    }
  }

  // 카드 추가
  async createCard(req, res, next) {
    try {

      const userId = req.params["id"];
      const CARD_ID = req.body.CARD_ID;
      const CARD_DATE = req.body.CARD_DATE;
      const CARD_TYPE = req.body.CARD_TYPE;

      if (CARD_ID == '' || CARD_DATE == '' || CARD_TYPE == '') {
        res.send(
          `<script type="text/javascript">
              alert("정보를 똑바로 입력하세요"); 
              location.href='/myPage/` +
          userId +
          `/addCard';</script>`
        );
      } else {
        await db("INSERT INTO CARD SET ?", {
          USER_ID: userId,
          CARD_ID: CARD_ID,
          CARD_DATE: CARD_DATE,
          CARD_TYPE: CARD_TYPE
        });
        next();
      }

    } catch (error) {
      console.log(error)
    }
  }

  // 카드 수정

  // 카드 삭제
}

module.exports = myPageController;