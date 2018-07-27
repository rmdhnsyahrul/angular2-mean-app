const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');
// const config = require('../config/database');

// User schema 
// add reference to avatar collection
const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        default: null
    },
    updated_at: {type: Date, default: Date.now}
})
UserSchema.plugin(uniqueValidator);
const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username}
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        if(err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save(callback);
        })
    })
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch)
    })
}

module.exports.getAllActiveUser = function(callback){
    const query = {"isOnline": true}
    User.find(query, callback);
}

module.exports.setActive = function(username, callback){
    const query = {"username": username}
    // User.findOne({"username": "hamida"}, callback);
    User.findOneAndUpdate(query, { 'isOnline': true }, callback)
}

module.exports.setInactive = function(username, callback){
    const query = {"username": username}
    // User.findOne({"username": "hamida"}, callback);
    User.findOneAndUpdate(query, { 'isOnline': false }, callback)
}

module.exports.updateUser = function(id, callback){
    User.findOneAndUpdate(id, user, callback)
}

module.exports.setUserImage = function(id, data, callback){
    const query = {"_id": id}
    User.findOneAndUpdate(query, {'avatar': data}, callback)
}