'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

_mongoose2.default.Promise = global.Promise;

var MapSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    geo: {
        type: [Number],
        index: '2d',
        required: true
    },
    // media: { type: Schema.Types.ObjectId, ref: 'Media' },
    // likes : [{ type: Schema.Types.ObjectId, ref: 'Like' }],
    // comments : [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    // flags : [{ type: Schema.Types.ObjectId, ref: 'Flag' }]
    _user: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});

var MapModel = _mongoose2.default.model('Map', MapSchema);

exports.default = MapModel;