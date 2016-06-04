const assign = require('object-assign');
const co = require('co');
const FalcorRouter = require('falcor-router');
const falcorKoa = require('./falcor-koa');

function isGenerator(obj) {
  return typeof obj.next === 'function' && typeof obj.throw === 'function';
}

function isGeneratorFunction(obj) {
  const constructor = obj.constructor;
  if (!constructor) return false;
  if (constructor.name === 'GeneratorFunction' || constructor.displayName === 'GeneratorFunction') {
    return true;
  }
  return isGenerator(constructor.prototype);
}

function createRouter(routes) {
  const modifiedRoutes = routes.map(function each(route) {
    const modifiedRoute = assign({}, route);
    ['get', 'call', 'set'].forEach(function eachMethod(method) {
      const fn = modifiedRoute[method];
      if (fn && isGeneratorFunction(fn)) {
        modifiedRoute[method] = co.wrap(fn);
      }
    });
    return modifiedRoute;
  });

  const BaseRouter = FalcorRouter.createClass(modifiedRoutes);

  function MyRouter(ctx, next) {
    BaseRouter.call(this);
    this.ctx = ctx;
  }

  MyRouter.prototype = Object.create(BaseRouter.prototype);

  return falcorKoa.dataSourceRoute(function (ctx, next) {
    return new MyRouter(ctx, next);
  });
}


module.exports = createRouter;
