const mongoose = require('mongoose');
require('./user.model');
require('./station.model');

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station',
        required: true
    },
    body: {
        type: String,
        required: true
    }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
