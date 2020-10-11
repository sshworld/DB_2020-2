/**
 * Visit API
 *
 */

const express = require("express");
const router = express.Router();
const orderController = require("./orderController");
const order = new orderController();



// 하나 주문 시 주문
router.get('/:uid/:value', order.singleOrder, (req, res) => {
    var sess = req.session.USER_ID;
    var userName = req.session.USER_NAME;
    const myAddr = req.body.myAddr
    const myCard = req.body.myCard
    const orderBook = req.session.orderBook
    const count = req.session.count
    res.render('index.ejs', {pages: './order/order.ejs', sess : sess, userName : userName, myAddr:myAddr, myCard:myCard, orderBook:orderBook, count:count});
});

// 하나 주문
router.post('/goOrder', order.purchase, (req, res) => {
    res.send(`<script type="text/javascript"> alert("주문을 완료 하였습니다."); location.href='/';</script>`)
})

// 주문 리스트
router.get('/:id', (req, res) => {
    var sess = req.session.USER_ID;
    var userName = req.session.USER_NAME;
    res.render('index.ejs', {pages: './order/orderList.ejs', sess : sess, userName : userName});
})

module.exports = router;
