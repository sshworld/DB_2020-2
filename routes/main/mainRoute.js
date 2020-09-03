/**
 * Visit API
 *
 */

const express = require("express");
const router = express.Router();
const mainController = require("./mainController");
const main = new mainController();

router.get('/',main.hello, (req, res) => {
    res.render('index.ejs', {title: 'test'});
});


module.exports = router;
