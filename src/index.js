import FalcorRouter from 'falcor-router';
import dataSourceRoute from './falcor-koa';

const router = {};

router.routes = (routes) => {
  const Router = FalcorRouter.createClass(routes);
  return dataSourceRoute(() => {
    return new Router();
  });
};

export default router;
