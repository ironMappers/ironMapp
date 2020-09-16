const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const SlackStrategy = require("passport-slack").Strategy;
const User = require('../models/user.model');

const randomPassword = () => Math.random().toString(36).substring(7);

passport.serializeUser(function (user, done) {
    done(null, user._id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
        .catch(e => {
            console.error(e);
            done(e);
        });
});

const google = new GoogleStrategy(
    {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/login/google"
    },
    (accessToken, refreshToken, profile, next) => {

        User.findOne({ "social.google": profile.id })
            .then(user => {
                if (user) {
                    next(null, user);
                } else {
                    const newUser = new User({
                        username: profile.displayName,
                        email: profile._json.email,
                        avatar: profile._json.picture,
                        password: profile.provider + randomPassword(),
                        social: {
                            google: profile.id,
                        },
                        status: {
                            active: true
                        }
                    });
                    newUser
                        .save()
                        .then((user) => {
                            next(null, user);
                        })
                        .catch((err) => next(err));
                }
            })
            .catch((err) => next(err));
    }
);


const slack = new SlackStrategy(
    { 
      clientID: process.env.SLACK_CLIENT_ID,
      clientSecret: process.env.SLACK_CLIENT_SECRET,
      callbackUrl: "/auth/slack",
    },
    (accessToken, refreshToken, profile, next) => {
      User.findOne({ "social.slack": profile.id })
        .then((user) => {
          if (user) {
            next(null, user);
          } else {
            const newUser = new User({
              username: profile.displayName,
              email: profile.user.email,
              avatar: profile.user.image_1024,
              password: profile.provider + randomPassword(),
              social: {
                slack: profile.id,
              },
              status: {
                active: true
              }
            });
  
            newUser
              .save()
              .then((user) => {
                next(null, user);
              })
              .catch((err) => next(err));
          }
        })
        .catch((err) => next(err));
    }
  );
  
//this should probably be in app.js
passport.use(slack);
passport.use(google);

module.exports = passport;