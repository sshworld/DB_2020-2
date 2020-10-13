/**
 * Visit API
 *
 */

const express = require("express");
const router = express.Router();
const basketController = require("./basketController");
const basket = new basketController();

// 장바구니 리스트
router.get('/basketList', basket.basketList, (req, res) => {
    var sess = req.session.USER_ID;
    var userName = req.session.USER_NAME;
    const orderList = req.body.orderList
    res.render('index.ejs', {pages: './basket/basketList.ejs', sess : sess, userName : userName, orderList:orderList});
})

// 장바구니 담기
router.get('/:uid/:index', basket.goBasket, (req, res) => {
    var sess = req.session.USER_ID;
    var userName = req.session.USER_NAME;
    res.render('index.ejs', {pages: '/', sess : sess, userName : userName});
});


module.exports = router;
