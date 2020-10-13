/**
 * Visit API
 *
 */

const express = require("express");
const router = express.Router();
const orderController = require("./orderController");
const order = new orderController();


// 하나 주문
router.post('/goOrder', order.purchase, (req, res) => {
    res.send(`<script type="text/javascript"> alert("주문을 완료 하였습니다."); location.href='/';</script>`)
})

// 주문 리스트
router.get('/orderList', order.orderList, (req, res) => {
    var sess = req.session.USER_ID;
    var userName = req.session.USER_NAME;
    const orderList = req.body.orderList
    res.render('index.ejs', {pages: './order/orderList.ejs', sess : sess, userName : userName, orderList:orderList});
})

// 주문 삭제
router.get('/:uid/delete', order.cancleOrder, (req, res) => {
    res.send(`<script type="text/javascript"> alert("주문을 취소 하였습니다."); location.href='/order/orderList';</script>`)
})

// 상세보기에서 주문
router.get('/:uid/:index', order.singleOrder, (req, res) => {
    var sess = req.session.USER_ID;
    var userName = req.session.USER_NAME;
    const myAddr = req.body.myAddr
    const myCard = req.body.myCard
    const orderBook = req.session.orderBook
    const count = req.session.count
    res.render('index.ejs', {pages: './order/order.ejs', sess : sess, userName : userName, myAddr:myAddr, myCard:myCard, orderBook:orderBook, count:count});
});

// 주문 상세 리스트
router.get('/:id/:uid/detail', order.detailList, (req, res) => {
    var sess = req.session.USER_ID;
    var userName = req.session.USER_NAME;
    const orderDetail = req.body.orderDetail
    const orderInfo = req.body.orderInfo
    res.render('index.ejs', {pages: './order/orderDetail.ejs', sess : sess, userName : userName, orderDetail:orderDetail, orderInfo:orderInfo});
})

module.exports = router;
