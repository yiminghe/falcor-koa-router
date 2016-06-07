const url = require('url');
const parse = require('co-body');

const parseArgs = Object.freeze({
  jsonGraph: true,
  callPath: true,
  arguments: true,
  pathSuffixes: true,
  paths: true,
});

function transformCtx(ctx) {
  const request = ctx.request;

  // parse request body for set method
  return parse.form(ctx)
    .then(function parseBody(body) {
      ctx.request.body = body;
      return;
    })
    .then(function createContext() {
      var queryMap;

      if (request.method === 'POST') {
        queryMap = ctx.request.body;
      } else {
        queryMap = url.parse(request.url, true).query;
      }

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
    });
}

function dataSourceRoute(handler) {
  return function route(ctx, next) {
    const dataSource = handler(ctx, next);

    return transformCtx(ctx)
      .then(function callRoute(context) {
        if (Object.keys(context).length === 0) {
          throw new Error('Request not supported');
        }
        if (!context.method || !context.method.length) {
          throw new Error('No query method provided');
        }
        if (!dataSource[context.method]) {
          throw new Error('Data source does not implement method ' + context.method);
        }

        return ({
          'set': function set() {
            return dataSource[context.method](context.jsonGraph);
          },
          'call': function call() {
            return dataSource[context.method](context.callPath, context.arguments, context.pathSuffixes, context.paths);
          },
          'get': function get() {
            return dataSource[context.method]([].concat(context.paths || []));
          },
        })[context.method]().toPromise();
      })
      .then(function returnResponse(data) {
        ctx.status = 200;
        ctx.body = data;
        return next();
      })
      .catch(function catchErrors(err) {
        ctx.body = err.message;
        ctx.status = 500;
        return next();
      });
  };
}

exports.dataSourceRoute = dataSourceRoute;
