'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var UsersController = function (_BaseController) {
  (0, _inherits3.default)(UsersController, _BaseController);

  function UsersController() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, UsersController);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = UsersController.__proto__ || Object.getPrototypeOf(UsersController)).call.apply(_ref, [this].concat(args))), _this), _this.whitelist = ['firstname', 'lastname', 'email', 'username', 'password'], _this._populate = function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
        var username, user, err;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                username = req.params.username;
                _context.prev = 1;
                _context.next = 4;
                return _user2.default.findOne({ username: username });

              case 4:
                user = _context.sent;

                if (user) {
                  _context.next = 9;
                  break;
                }

                err = new Error('User not found.');

                err.status = 404;
                return _context.abrupt('return', next(err));

              case 9:

                req.user = user;
                next();
                _context.next = 16;
                break;

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
    }(), _this.search = function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.t0 = res;
                _context2.next = 4;
                return _user2.default.find();

              case 4:
                _context2.t1 = _context2.sent;

                _context2.t0.json.call(_context2.t0, _context2.t1);

                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t2 = _context2['catch'](0);

                next(_context2.t2);

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2, [[0, 8]]);
      }));

      return function (_x4, _x5, _x6) {
        return _ref3.apply(this, arguments);
      };
    }(), _this.fetch = function (req, res) {
      var user = req.user || req.currentUser;

      if (!user) {
        return res.sendStatus(404);
      }

      res.json(user);
    }, _this.create = function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
        var params, newUser, savedUser, token;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                params = _this.filterParams(req.body, _this.whitelist);
                newUser = new _user2.default((0, _extends3.default)({}, params, {
                  provider: 'local'
                }));
                _context3.prev = 2;
                _context3.next = 5;
                return newUser.save();

              case 5:
                savedUser = _context3.sent;
                token = savedUser.generateToken();

                res.status(201).json({ token: token });
                _context3.next = 14;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3['catch'](2);

                _context3.t0.status = 400;
                next(_context3.t0);

              case 14:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this2, [[2, 10]]);
      }));

      return function (_x7, _x8, _x9) {
        return _ref4.apply(this, arguments);
      };
    }(), _this.update = function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, next) {
        var newAttributes, updatedUser;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                newAttributes = _this.filterParams(req.body, _this.whitelist);
                updatedUser = Object.assign({}, req.currentUser, newAttributes);
                _context4.prev = 2;
                _context4.t0 = res.status(200);
                _context4.next = 6;
                return updatedUser.save();

              case 6:
                _context4.t1 = _context4.sent;

                _context4.t0.json.call(_context4.t0, _context4.t1);

                _context4.next = 13;
                break;

              case 10:
                _context4.prev = 10;
                _context4.t2 = _context4['catch'](2);

                next(_context4.t2);

              case 13:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this2, [[2, 10]]);
      }));

      return function (_x10, _x11, _x12) {
        return _ref5.apply(this, arguments);
      };
    }(), _this.delete = function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(req, res, next) {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (req.currentUser) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt('return', res.sendStatus(403));

              case 2:
                _context5.prev = 2;
                _context5.next = 5;
                return req.currentUser.remove();

              case 5:
                res.sendStatus(204);
                _context5.next = 11;
                break;

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5['catch'](2);

                next(_context5.t0);

              case 11:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, _this2, [[2, 8]]);
      }));

      return function (_x13, _x14, _x15) {
        return _ref6.apply(this, arguments);
      };
    }(), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  return UsersController;
}(_base2.default);

exports.default = new UsersController();