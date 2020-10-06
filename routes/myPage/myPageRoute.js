/**
 * Visit API
 *
 */

const express = require("express");
const router = express.Router();
const myPageController = require("./myPageController");
const myPage = new myPageController();

router.get("/:id", myPage.myInfo, (req, res) => {
  var sess = req.session.USER_ID;
  var userName = req.session.USER_NAME;
  var myAddr = req.body.myAddr
  res.render("index.ejs", {
    pages: "./myPage/myPage.ejs",
    sess: sess,
    userName: userName,
    myAddr:myAddr
  });
});

router.get("/:id/addr", (req, res) => {
  var sess = req.session.USER_ID;
  var userName = req.session.USER_NAME;
  res.render("index.ejs", {
    pages: "./myPage/addAddr.ejs",
    sess: sess,
    userName: userName,
  });
});

router.post("/:id/addAddr", myPage.createAddr, (req, res) => {
  var sess = req.session.USER_ID;
  res.send(
    `<script type="text/javascript"> alert("주소등록 성공"); location.href='/myPage/:` +
      sess +
      `';</script>`
  );
});

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
  var userName = req.session.USER_NAME;
  res.render("index.ejs", {
    pages: "./myPage/myPage.ejs",
    sess: sess,
    userName: userName,
  });
});

module.exports = router;
