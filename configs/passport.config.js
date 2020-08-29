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
            } else if (!user) {
                return done(null, false, {
                    message: 'Wrong credentials'
                });
            } else if (user) {
                user.checkPassword(password)
                    .then(result => {
                        if (result) {
                            return done(null, user);
                        } else {
                            return done(null, false, {
                                message: 'Wrong credentials'
                            });
                        }
                    });
            }
        });
    }
));

passport.serializeUser(function (user, next) {
    next(null, user);
});
passport.deserializeUser(function (user, next) {
    next(null, user);
});

module.exports = passport;