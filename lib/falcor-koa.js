'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.default = dataSourceRoute;

var _ctxToContext = require('./ctxToContext');

var _ctxToContext2 = _interopRequireDefault(_ctxToContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function dataSourceRoute(handler) {
  var _this = this;

  return function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              return _context2.delegateYield(_regenerator2.default.mark(function _callee() {
                var dataSource, context, data;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return handler(ctx, next);

                      case 2:
                        dataSource = _context.sent;
                        _context.next = 5;
                        return (0, _ctxToContext2.default)(ctx);

                      case 5:
                        context = _context.sent;

                        if (!((0, _keys2.default)(context).length === 0)) {
                          _context.next = 8;
                          break;
                        }

                        throw new Error('Request not supported');

                      case 8:
                        if (!(!context.method || !context.method.length)) {
                          _context.next = 10;
                          break;
                        }

                        throw new Error('No query method provided');

                      case 10:
                        if (dataSource[context.method]) {
                          _context.next = 12;
                          break;
                        }

                        throw new Error('Data source does not implement method ' + context.method);

                      case 12:
                        _context.next = 14;
                        return {
                          set: function set() {
                            return dataSource[context.method](context.jsonGraph);
                          },
                          call: function call() {
                            return dataSource[context.method](context.callPath, context.arguments, context.pathSuffixes, context.paths);
                          },
                          get: function get() {
                            return dataSource[context.method]([].concat(context.paths || []));
                          }
                        }[context.method]().toPromise();

                      case 14:
                        data = _context.sent;


                        ctx.status = 200;
                        ctx.body = data;

                      case 17:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, _this);
              })(), 't0', 2);

            case 2:
              _context2.next = 8;
              break;

            case 4:
              _context2.prev = 4;
              _context2.t1 = _context2['catch'](0);

              ctx.body = _context2.t1.message;
              ctx.status = 500;

            case 8:
              _context2.next = 10;
              return next();

            case 10:
              return _context2.abrupt('return', _context2.sent);

            case 11:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this, [[0, 4]]);
    }));
    return function (_x, _x2) {
      return ref.apply(this, arguments);
    };
  }();
}
module.exports = exports['default'];