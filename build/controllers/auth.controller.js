'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _base = require('./base.controller');

var _base2 = _interopRequireDefault(_base);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AuthController = function (_BaseController) {
  (0, _inherits3.default)(AuthController, _BaseController);

  function AuthController() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, AuthController);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AuthController.__proto__ || Object.getPrototypeOf(AuthController)).call.apply(_ref, [this].concat(args))), _this), _this.login = function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
        var _req$body, username, password, user, err, token;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, username = _req$body.username, password = _req$body.password;
                _context.prev = 1;
                _context.next = 4;
                return _user2.default.findOne({ username: username });

              case 4:
                user = _context.sent;

                if (!(!user || !user.authenticate(password))) {
                  _context.next = 9;
                  break;
                }

                err = new Error('Please verify your credentials.');

                err.status = 401;
                return _context.abrupt('return', next(err));

              case 9:
                token = user.generateToken();
                return _context.abrupt('return', res.status(200).json({ token: token }));

              case 13:
                _context.prev = 13;
                _context.t0 = _context['catch'](1);

                next(_context.t0);

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2, [[1, 13]]);
      }));

      return function (_x, _x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }(), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  return AuthController;
}(_base2.default);

exports.default = new AuthController();