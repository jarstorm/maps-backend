'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constants = require('./config/constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Use native promises
_mongoose2.default.Promise = global.Promise;

// Connect to our mongo database;
_mongoose2.default.connect(_constants2.default.mongo.uri).then(function () {
    console.log("connection OK");
}, function (err) {
    console.log("connection KO");
    throw err;
});