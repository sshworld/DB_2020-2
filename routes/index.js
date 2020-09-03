/**
 *
 */

/** Routes */
const mainRouter = require('./main');
const usersRouter = require('./users');

const getRouter = (path, controller) => ({ path, controller });

const routes = [
  getRouter('/', mainRouter),
  getRouter('/users', usersRouter),
  getRouter('/*', (req, res) => {
    res.send({
      status: 404,
      message: 'Empty API',
    });
  }),
];

module.exports = routes;
