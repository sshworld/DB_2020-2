/**
 * orderController
 *
 */

const db = require('../../config/dbConfig');

class orderController {
  async hello(req, res, next) {
    
    next();
  }
}

module.exports = orderController;
