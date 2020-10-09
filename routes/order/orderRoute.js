/**
 * Visit API
 *
 */

const express = require("express");
const router = express.Router();
const orderController = require("./orderController");
const order = new orderController();

router.get('/:uid/:value', order.hello, (req, res) => {
    var sess = req.session.USER_ID;
    var userName = req.session.USER_NAME;
    const myAddr = req.body.myAddr
    res.render('index.ejs', {pages: './order/order.ejs', sess : sess, userName : userName, myAddr:myAddr});
});


module.exports = router;
