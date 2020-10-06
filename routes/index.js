/**
 *
 */

/** Routes */
const mainRouter = require('./main');
const usersRouter = require('./users');
const basketRouter = require('./basket');
const myPageRouter = require('./myPage');
const orderRouter = require('./order');
const bookRouter = require('./book');

const getRouter = (path, controller) => ({ path, controller });

const routes = [
  getRouter('/', mainRouter),
  getRouter('/users', usersRouter),
  getRouter('/basket', basketRouter),
  getRouter('/myPage', myPageRouter),
  getRouter('/order', orderRouter),
  getRouter('/book', bookRouter),
  getRouter('/*', (req, res) => {
    res.send({
      status: 404,
      message: 'Empty API',
    });
  }),
];

module.exports = routes;
