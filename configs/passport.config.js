const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');

passport.use(new LocalStrategy(
    (username, password, done) => {
        User.findOne({
            username: username
        }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'Wrong credentials'
                });
            }
            if (!user.checkPassword(password)) {
                return done(null, false, {
                    message: 'Wrong credentials'
                });
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function(user, next) {
  next(null, user);
});
passport.deserializeUser(function(user, next) {
  next(null, user);
});

module.exports = passport;