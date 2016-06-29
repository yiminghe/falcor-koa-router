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

var _freeze = require('babel-runtime/core-js/object/freeze');

var _freeze2 = _interopRequireDefault(_freeze);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _coBody = require('co-body');

var _coBody2 = _interopRequireDefault(_coBody);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parseArgs = (0, _freeze2.default)({
  jsonGraph: true,
  callPath: true,
  arguments: true,
  pathSuffixes: true,
  paths: true
});

exports.default = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx) {
    var request, context, queryMap;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            request = ctx.request;
            context = {};
            queryMap = void 0;

            // parse request body for set method

            _context.next = 5;
            return _coBody2.default.form(ctx);

          case 5:
            request.body = _context.sent;


            if (request.method === 'POST') {
              queryMap = request.body;
            } else {
              queryMap = _url2.default.parse(request.url, true).query;
            }

            if (queryMap) {
              (0, _keys2.default)(queryMap).forEach(function (key) {
                var arg = queryMap[key];
                if (parseArgs[key] && arg) {
                  context[key] = JSON.parse(arg);
                } else {
                  context[key] = arg;
                }
              });
            }
            return _context.abrupt('return', (0, _freeze2.default)(context));

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function ctxToContext(_x) {
    return ref.apply(this, arguments);
  }

  return ctxToContext;
}();

module.exports = exports['default'];