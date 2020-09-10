/**
 * Visit API
 *
 */

const express = require("express");
const router = express.Router();
const UserController = require("./UserController");
const User = new UserController();

// 로그인 화면
router.get('/login', (req, res) => {
    var sess = req.session.USER_ID;
    res.render('index.ejs', {pages: './users/login.ejs', sess: sess});
});

// 로그인
router.post('/goLogin', User.goLogin, (req, res) => {
    var USER_ID = req.session.USER_ID;
    res.send(
        `<script type="text/javascript">
        alert("로그인 성공"); 
        location.href='/users/success';
        </script>`
    );
});

// 회원가입 화면
router.get('/sign', (req, res) => {
    var sess = req.session.USER_ID;
    res.render('index.ejs', {pages: './users/sign.ejs', sess: sess});
});

// 회원가입
router.post('/goSign', User.goSign ,(req, res) => {
    res.send(
        `<script type="text/javascript">
        alert("회원가입 성공");
        location.href='/users/success';
        </script>`
    );
});

// 성공
router.get('/success', (req, res) => {
    var sess = req.session.USER_ID;
    res.render('index.ejs', {pages: './users/success.ejs', sess: sess});
});

// 로그아웃
router.get('/logout', User.goLogout, (req, res) => {
    var sess = null;
    res.render('index.ejs', {pages: './home/main.ejs', sess: sess});
});

module.exports = router;
