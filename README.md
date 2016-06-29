# falcor-koa-router

Allows you to use Falcor routes with koa-mount (using the new async/await middleware syntax).

## Installation
```
$ npm install falcor-koa-router --save
```

## Example

```js
import Koa from 'koa';
import mount from 'koa-mount';
import router from 'falcor-koa-router';

const app = new Koa();

app.use(mount('/', router.routes([
    {
      route: 'test',
      get: async (paths) => {
        let value = await test('Hello Test');
        return {
          path: ['test'],
          value: value
        };
      },
      set: async (jsonGraph) => {
        let text = jsonGraph.test;
        let value = await test(text);
        return {
          path: ['test'],
          value: value
        }
      }
    }
  ])
));

app.listen(3000, 'localhost');

```

## License
MIT
