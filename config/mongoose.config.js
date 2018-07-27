"use strict";
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = (config) => {
    var dbURI = config.dev.db;

    // using new syntax for mongoose library
    // check the mongoose doc for more info
    mongoose.connect(dbURI).then(() => {
      console.log(`Connected to ${dbURI}`);
    }).catch((e) => {
      throw e;
    });
}