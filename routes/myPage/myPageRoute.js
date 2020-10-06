/**
 * Visit API
 *
 */

const express = require("express");
const router = express.Router();
const myPageController = require("./myPageController");
const myPage = new myPageController();

// 마이페이지 불러오기
router.get("/:id", myPage.myInfo, (req, res) => {
  const sess = req.session.USER_ID;
  const userName = req.session.USER_NAME;
  const myAddr = req.body.myAddr
  const myCard = req.body.myCard
  res.render("index.ejs", {
    pages: "./myPage/myPage.ejs",
    sess: sess,
    userName: userName,
    myAddr: myAddr,
    myCard: myCard
  });
});

// 주소 추가
router.get("/:id/addr", (req, res) => {
  var sess = req.session.USER_ID;
  var userName = req.session.USER_NAME;
  res.render("index.ejs", {
    pages: "./myPage/addAddr.ejs",
    sess: sess,
    userName: userName
  });
});

router.post("/:id/addAddr", myPage.createAddr, (req, res) => {
  var sess = req.session.USER_ID;
  res.send(
    `<script type="text/javascript"> alert("주소등록 성공"); location.href='/myPage/` + sess + `';</script>`
  );
});

// 주소 수정
router.get("/:id/:uid/addr", (req, res) => {
  var sess = req.session.USER_ID;
  var userName = req.session.USER_NAME;
  const uid = req.params["uid"];
  
  res.render("index.ejs", {
    pages: "./myPage/updateAddr.ejs",
    sess: sess,
    userName: userName,
    uid: uid
  });
})

router.post("/:id/:uid/updateAddr", myPage.updateAddr, (req, res) => {
  var sess = req.session.USER_ID;
  res.send(
    `<script type="text/javascript"> alert("주소수정 성공"); location.href='/myPage/` + sess + `';</script>`
  );
});

// 주소 삭제
router.get("/:id/:uid/deleteAddr", myPage.deleteAddr, (req, res) => {
  var sess = req.session.USER_ID;
  res.send(
    `<script type="text/javascript"> alert("주소를 삭제하였습니다."); location.href='/myPage/` + sess + `';</script>`
  );
});

// 카드 추가
router.get("/:id/card", (req, res) => {
  var sess = req.session.USER_ID;
  var userName = req.session.USER_NAME;
  res.render("index.ejs", {
    pages: "./myPage/addCard.ejs",
    sess: sess,
    userName: userName,
  });
});

router.post("/:id/addCard", myPage.createCard, (req, res) => {
  var sess = req.session.USER_ID;
  res.send(
    `<script type="text/javascript"> alert("카드등록 성공"); location.href='/myPage/` +
    sess +
    `';</script>`
  );
});

// 카드 수정
router.get("/:id/:uid/card", (req, res) => {
  var sess = req.session.USER_ID;
  var userName = req.session.USER_NAME;
  const uid = req.params["uid"];
  
  res.render("index.ejs", {
    pages: "./myPage/updateCard.ejs",
    sess: sess,
    userName: userName,
    uid: uid
  });
})

router.post("/:id/:uid/updateCard", myPage.updateCard, (req, res) => {
  var sess = req.session.USER_ID;
  res.send(
    `<script type="text/javascript"> alert("카드수정 성공"); location.href='/myPage/` + sess + `';</script>`
  );
});

// 카드 삭제
router.get("/:id/:uid/deleteCard", myPage.deleteCard, (req, res) => {
  var sess = req.session.USER_ID;
  res.send(
    `<script type="text/javascript"> alert("카드를 삭제하였습니다."); location.href='/myPage/` + sess + `';</script>`
  );
});

module.exports = router;