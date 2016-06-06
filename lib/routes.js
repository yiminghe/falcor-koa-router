const FalcorRouter = require('falcor-router');
const falcorKoa = require('./falcor-koa');

function createRouter(routes) {
  const BaseRouter = FalcorRouter.createClass(routes);

  function MyRouter(ctx, next) {
    BaseRouter.call(this);
    this.ctx = ctx;
    this.next = next;
  }

  MyRouter.prototype = Object.create(BaseRouter.prototype);

  return falcorKoa.dataSourceRoute(function handler(ctx, next) {
    return new MyRouter(ctx, next);
  });
}

module.exports = createRouter;
