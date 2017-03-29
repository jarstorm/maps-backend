'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _post = require('./post');

var _post2 = _interopRequireDefault(_post);

var _constants = require('../config/constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

var Schema = _mongoose2.default.Schema;
var UserSchema = new Schema({
    firstname: String,
    lastname: String,
    username: {
        type: String,
        unique: true,
        required: [true, 'Username is required.']
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'Email is required'],
        validate: {
            validator: function validator(email) {
                // eslint-disable-next-line max-len
                var emailRegex = /^[-a-z0-9%S_+]+(\.[-a-z0-9%S_+]+)*@(?:[a-z0-9-]{1,63}\.){1,125}[a-z]{2,63}$/i;
                return emailRegex.test(email);
            },

            message: '{VALUE} is not a valid email.'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required.']
    },
    role: {
        type: String,
        default: 'user'
    }
}, {
    timestamps: true
});

// Strip out password field when sending user object to client
UserSchema.set('toJSON', {
    virtuals: true,
    transform: function transform(doc, obj) {
        obj.id = obj._id;
        delete obj._id;
        delete obj.__v;
        delete obj.password;
        return obj;
    }
});

// Ensure email has not been taken
UserSchema.path('email').validate(function (email, respond) {
    UserModel.findOne({ email: email }).then(function (user) {
        respond(user ? false : true);
    }).catch(function () {
        respond(false);
    });
}, 'Email already in use.');

// Validate username is not taken
UserSchema.path('username').validate(function (username, respond) {
    UserModel.findOne({ username: username }).then(function (user) {
        respond(user ? false : true);
    }).catch(function () {
        respond(false);
    });
}, 'Username already taken.');

// Validate password field
UserSchema.path('password').validate(function (password) {
    return password.length >= 6 && password.match(/\d+/g);
}, 'Password be at least 6 characters long and contain 1 number.');

//
UserSchema.pre('save', function (done) {
    var _this = this;

    // Encrypt password before saving the document
    if (this.isModified('password')) {
        var saltRounds = _constants2.default.security.saltRounds;

        this._hashPassword(this.password, saltRounds, function (err, hash) {
            _this.password = hash;
            done();
        });
    } else {
        done();
    }
    // eslint-enable no-invalid-this
});

/**
 * User Methods
 */
UserSchema.methods = {
    getPosts: function getPosts() {
        return _post2.default.find({ _user: this._id });
    },


    /**
     * Authenticate - check if the passwords are the same
     * @public
     * @param {String} password
     * @return {Boolean} passwords match
     */
    authenticate: function authenticate(password) {
        return _bcrypt2.default.compareSync(password, this.password);
    },


    /**
     * Generates a JSON Web token used for route authentication
     * @public
     * @return {String} signed JSON web token
     */
    generateToken: function generateToken() {
        return _jsonwebtoken2.default.sign({ _id: this._id }, _constants2.default.security.sessionSecret, {
            expiresIn: _constants2.default.security.sessionExpiration
        });
    },


    /**
     * Create password hash
     * @private
     * @param {String} password
     * @param {Number} saltRounds
     * @param {Function} callback
     * @return {Boolean} passwords match
     */
    _hashPassword: function _hashPassword(password) {
        var saltRounds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants2.default.security.saltRounds;
        var callback = arguments[2];

        return _bcrypt2.default.hash(password, saltRounds, callback);
    }
};

var UserModel = _mongoose2.default.model('User', UserSchema);

exports.default = UserModel;