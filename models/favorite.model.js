const mongoose = require('mongoose');
require('./user.model');
require('./station.model');

const favoriteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, 
    station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station',
        required: true
    }
});

const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;