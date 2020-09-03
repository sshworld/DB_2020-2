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
    res.render('index.ejs', {pages: './users/login.ejs'});
});

// 로그인
router.post('/login', (req, res) => {
    res.render('index.ejs', {pages: './users/login.ejs'});
});

// 회원가입 화면
router.get('/sign', (req, res) => {
    res.render('index.ejs', {pages: './users/sign.ejs'});
});

// 회원가입

module.exports = router;
