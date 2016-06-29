'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _falcorRouter = require('falcor-router');

var _falcorRouter2 = _interopRequireDefault(_falcorRouter);

var _falcorKoa = require('./falcor-koa');

var _falcorKoa2 = _interopRequireDefault(_falcorKoa);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = {};

router.routes = function (routes) {
  var Router = _falcorRouter2.default.createClass(routes);
  return (0, _falcorKoa2.default)(function () {
    return new Router();
  });
};

exports.default = router;
module.exports = exports['default'];