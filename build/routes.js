'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _meta = require('./controllers/meta.controller');

var _meta2 = _interopRequireDefault(_meta);

var _auth = require('./controllers/auth.controller');

var _auth2 = _interopRequireDefault(_auth);

var _users = require('./controllers/users.controller');

var _users2 = _interopRequireDefault(_users);

var _posts = require('./controllers/posts.controller');

var _posts2 = _interopRequireDefault(_posts);

var _map = require('./controllers/map.controller');

var _map2 = _interopRequireDefault(_map);

var _authenticate = require('./middleware/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _accessControl = require('./middleware/access-control');

var _accessControl2 = _interopRequireDefault(_accessControl);

var _errorHandler = require('./middleware/error-handler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = new _express.Router();

routes.get('/', _meta2.default.index);

// Authentication
routes.post('/auth/login', _auth2.default.login);

// Users
routes.get('/users', _users2.default.search);
routes.post('/users', _users2.default.create);
routes.get('/users/me', _authenticate2.default, _users2.default.fetch);
routes.put('/users/me', _authenticate2.default, _users2.default.update);
routes.delete('/users/me', _authenticate2.default, _users2.default.delete);
routes.get('/users/:username', _users2.default._populate, _users2.default.fetch);

// Post
routes.get('/posts', _posts2.default.search);
routes.post('/posts', _authenticate2.default, _posts2.default.create);
routes.get('/posts/:id', _posts2.default._populate, _posts2.default.fetch);
routes.delete('/posts/:id', _authenticate2.default, _posts2.default.delete);

// Admin
routes.get('/admin', (0, _accessControl2.default)('admin'), _meta2.default.index);

// Map
routes.get('/map', _map2.default.search);
routes.post('/map', _map2.default.create);

routes.use(_errorHandler2.default);

exports.default = routes;