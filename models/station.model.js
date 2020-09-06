const mongoose = require('mongoose');
require('./user.model');
require('./station.model');

const stationSchema = new mongoose.Schema({
    IDEES: {
        type: String,
        required: true
    }
});

const Station = mongoose.model('Station', stationSchema);
module.exports = Station;
