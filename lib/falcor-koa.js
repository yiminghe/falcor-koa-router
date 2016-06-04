const url = require('url');

const parseArgs = Object.freeze({
  jsonGraph: true,
  callPath: true,
  arguments: true,
  pathSuffixes: true,
  paths: true,
});

function requestToContext(request) {
  const queryMap = request.method === 'POST' ? request.body : url.parse(request.url, true).query;
  const context = {};

  if (queryMap) {
    Object.keys(queryMap).forEach(function each(key) {
      const arg = queryMap[key];
      if (parseArgs[key] && arg) {
        context[key] = JSON.parse(arg);
      } else {
        context[key] = arg;
      }
    });
  }
  return Object.freeze(context);
}

function dataSourceRoute(handler) {
  return function route(ctx, next) {
    const dataSource = handler(ctx, next);

    if (!dataSource) {
      return;
    }

    const context = requestToContext(ctx.request);

    if (Object.keys(context).length === 0) {
      throw new Error('Request not supported');
    }
    if (!context.method || !context.method.length) {
      throw new Error('No query method provided');
    }
    if (!dataSource[context.method]) {
      throw new Error('Data source does not implement method ' + context.method);
    }

    const observable = ({
      'set': function set() {
        return dataSource[context.method](context.jsonGraph);
      },
      'call': function call() {
        return dataSource[context.method](context.callPath, context.arguments, context.pathSuffixes, context.paths);
      },
      'get': function get() {
        return dataSource[context.method]([].concat(context.paths || []));
      },
      'undefined': function undefinedMethod() {
        return _this.throw('Unsupported method ' + context.method, 500);
      },
    })[context.method]();

    ctx.status = 200;

    // Note: toPromise could be removed in the future (https://github.com/Netflix/falcor/issues/464)
    return observable.toPromise()
      .then(function (data) {
        ctx.body = data;
        return next()
      });
  };
}

exports.dataSourceRoute = dataSourceRoute;
