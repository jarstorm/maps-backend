import mongoose from 'mongoose';
import Constants from './config/constants';

// Use native promises
mongoose.Promise = global.Promise;

// Connect to our mongo database;
mongoose.connect(Constants.mongo.uri).then(
    () => { console.log("connection OK"); },
    err => { console.log("connection KO");
        throw err; }
);
