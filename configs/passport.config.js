const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');

passport.use('local', new LocalStrategy(
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

passport.serializeUser(function (user, done) {
    done(null, user._id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
        .catch(e => {
            console.error(e)
            done(e)
        });
});

module.exports = passport;