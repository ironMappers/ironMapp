const passport = require('passport');
const User = require('../models/user.model');

passport.use(new LocalStrategy)


// we need a passport.session() somewhere !!!
module.exports = passport.initialize();