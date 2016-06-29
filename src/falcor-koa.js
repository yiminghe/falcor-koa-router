import ctxToContext from './ctxToContext';

export default function dataSourceRoute(handler) {
  return async (ctx, next) => {
    try {
      const dataSource = await handler(ctx, next);
      const context = await ctxToContext(ctx);

      if (Object.keys(context).length === 0) {
        throw new Error('Request not supported');
      }

      if (!context.method || !context.method.length) {
        throw new Error('No query method provided');
      }

      if (!dataSource[context.method]) {
        throw new Error('Data source does not implement method ' + context.method);
      }

      const data = await ({
        set: () => {
          return dataSource[context.method](context.jsonGraph);
        },
        call: () => {
          return dataSource[context.method](context.callPath, context.arguments, context.pathSuffixes, context.paths);
        },
        get: () => {
          return dataSource[context.method]([].concat(context.paths || []));
        },
      })[context.method]().toPromise();

      ctx.status = 200;
      ctx.body = data;
    } catch (err) {
      ctx.body = err.message;
      ctx.status = 500;
    }
    return await next();
  };
}
