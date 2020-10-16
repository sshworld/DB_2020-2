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
    const cartList = req.body.cartList
    res.render('index.ejs', {pages: './basket/basketList.ejs', sess : sess, userName : userName, cartList:cartList});
})

// 장바구니 주문
router.get('/:uid/order', basket.orderBasket, (req, res) => {
    var sess = req.session.USER_ID;
    var userName = req.session.USER_NAME;
    const myAddr = req.body.myAddr
    const myCard = req.body.myCard
    const orderBook = req.session.orderBook
    const count = req.session.count
    res.render('index.ejs', {pages: './order/order.ejs', sess : sess, userName : userName, myAddr:myAddr, myCard:myCard, orderBook:orderBook, count:count});
})

// 장바구니 담기
router.get('/:uid/:index', basket.goBasket, (req, res) => {
    res.send(`<script type="text/javascript"> alert("장바구니에 담았습니다."); location.href='/';</script>`)
});

// 장바구니 수정
router.get('/:uid/:index/update', basket.updateBasket, (req, res) => {
    res.send(`<script type="text/javascript"> location.href='/basket/basketList';</script>`)
})

// 장바구니 삭제
router.get('/:cart/:book/delete', basket.deleteList, (req, res) => {
    res.send(`<script type="text/javascript"> alert("장바구니를 삭제하였습니다."); location.href='/basket/basketList';</script>`)
})



module.exports = router;
