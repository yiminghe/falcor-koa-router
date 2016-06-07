const FalcorRouter = require('falcor-router');
const falcorKoa = require('./falcor-koa');

function createRouter(routes) {
  const Router = FalcorRouter.createClass(routes);

  return falcorKoa.dataSourceRoute(function handler() {
    return new Router();
  });
}

module.exports = createRouter;
