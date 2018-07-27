var mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
    roomID: String,
    person: String,
    message: String,
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Chat', ChatSchema);