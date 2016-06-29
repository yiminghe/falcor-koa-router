# falcor-koa-router

falcor router middleware for koa

### Updated
* Updated to latest falcor-router
* Added unit tests
* Updated to use koa@next
* Remove generator usage

## usage

```js
import Koa from 'koa';
import mount from 'koa-mount';
import router from 'falcor-koa-router';

app.use(mount('/', router.routes([
    {
      route: 'test',
      get: async (paths) => {
        let value = await testAsyncGetFunction('Hello Test');
        return {
          path: ['test'],
          value: value
        };
      },
      set: async (jsonGraph) => {
        let text = jsonGraph.test;
        let value = await testAsyncSetFunction(text);
        return {
          path: ['test'],
          value: value
        }
      }
    }
  ])
));

```
