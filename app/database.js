import mongoose from 'mongoose';
import Constants from './config/constants';

// Use native promises
mongoose.Promise = Promise;

// Connect to our mongo database;
mongoose.connect(Constants.mongo.uri);
mongoose.connection.on('error', (err) => {
    throw err;
});
