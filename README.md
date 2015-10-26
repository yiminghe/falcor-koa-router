# falcor-koa-router

falcor router middleware for koa

## usage

```js
var router = require('falcor-koa-router');
var mount = require('koa-mount');
// array format referred to https://github.com/Netflix/falcor-router
app.use(mount('model.json', router.routes([
{
  route: 'app',
  // generator function
  get: function* (){
    yield wait(100);
    return {
      path: ['app'],
      // this.ctx: koa context
      value: this.ctx.url
    };
  }
},
{
  router: 'app2',
  // promise
  get() {
    return new Promise(function(resolve) {
      setTimeout(function(){
        resolve({
          path:[app2],
          value: 'xx'
        })
      },1000);
    });
  }
}
])));
```