/**
 * Visit API
 *
 */

const db = require('../../config/dbConfig');

class mainController {
  async hello(req, res, next) {
    
    next();
  }
}

module.exports = mainController;
