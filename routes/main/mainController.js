/**
 * Visit API
 *
 */

const pool = require('../../config/dbConfig');

class mainController {
  async hello(req, res, next) {
    var a = "hello";

    req.body.name = a;
    next();
  }
}

module.exports = mainController;
