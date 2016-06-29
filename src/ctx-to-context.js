import url from 'url';
import parse from 'co-body';

const parseArgs = Object.freeze({
  jsonGraph: true,
  callPath: true,
  arguments: true,
  pathSuffixes: true,
  paths: true,
});

export default async function ctxToContext(ctx) {
  const request = ctx.request;
  const context = {};
  let queryMap;

  // parse request body for set method
  request.body = await parse.form(ctx);

  if (request.method === 'POST') {
    queryMap = request.body;
  } else {
    queryMap = url.parse(request.url, true).query;
  }

  if (queryMap) {
    Object.keys(queryMap).forEach((key) => {
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
