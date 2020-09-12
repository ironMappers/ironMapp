const mongoose = require('mongoose');
require('./user.model');

const stationSchema = new mongoose.Schema({
    IDEESS: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    }
});

const Station = mongoose.model('Station', stationSchema);
module.exports = Station;
