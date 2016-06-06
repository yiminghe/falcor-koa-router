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
        get: (paths) => {
          return new Promise((resolve, reject) => {
            return resolve({
              path: ['test'],
              value: 'Hello Test'
            });
          });
        },
        set: (jsonGraph) => {
          return {
            path: ['test'],
            value: jsonGraph.test
          }
        }
      }
    ])
  ));
```
