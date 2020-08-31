const mongoose = require('mongoose');
const User = require('../models/user.model');
const mailer = require('../configs/mailer.config');
const passport = require('passport');

module.exports.renderLogin = (req, res, next) => {
    res.render('users/login');
};

module.exports.renderSignup = (req, res, next) => {
    res.render('users/signup');
};

module.exports.createUser = (req, res, next) => {
    const user = new User({
        ...req.body,
        avatar: req.file ? req.file.path : undefined
    });

    user.save()
        .then(user => {
            mailer.sendValidationEmail({
                name: user.username,
                email: user.email,
                id: user._id.toString(),
                activationToken: user.status.token
            });

            res.render('users/login', {
                message: 'Check your email for activation'
            });
        })
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.render("users/signup", {
                    error: error.errors,
                    user
                });
            } else if (error.code === 11000) { // error when duplicated user
                res.render("users/signup", {
                    user,
                    error: {
                        email: {
                            message: 'user already exists'
                        }
                    }
                });
            } else {
                next(error);
            }
        })
        .catch(next);
};

module.exports.activateUser = (req, res, next) => {
    User.findOne({
            "status.token": req.params.token
        })
        .then(user => {
            if (user) {
                user.status.active = true;
                user.save()
                    .then(newUser => {
                        res.render('users/login', {
                            message: 'Your account has been activated, log in below!'
                        });
                    })
                    .catch(error => next);
            } else {
                res.render('users/login', {
                    message: 'Invalid link'
                });
            }

        })

        .catch(error => next);
};

module.exports.renderLogin = (req, res, next) => {
    res.render('users/login');
};

module.exports.doLogin = (req, res, next) => {
    passport.authenticate('local', (error, user, message) => {
        if (error) {
            next(error)
        } else if (!user) {
            next(new Error(message));
        } else {
            req.login(user, (error) => {
                if (error) {
                    next(new Error(error.message));
                } else {
                    res.json(req.user);
                }
            });
        }
    })(req, res, next)
}

/* module.exports.doLogin = (req, res, next) => {
  const passportController = passport.authenticate("local", (error, user) => {
    if (error) {
      next(error);
    } else {
        console.log('holis')
      req.session.userId = user._id;
      res.redirect("/");
    }
  })

  passportController(req, res, next);
}; */

module.exports.doLogout = (req, res, next) => {
    req.logout();
    res.redirect('/login');
};

module.exports.renderSignup = (req, res, next) => {
    res.render('users/signup');
};

module.exports.renderDashboard = (req, res, next) => {
    res.send(req.session)
};