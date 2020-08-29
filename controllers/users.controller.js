const mongoose = require('mongoose')
const User = require('../models/user.model')
const mailer = require('../configs/mailer.config');

module.exports.login = (req, res, next) => {
  res.render('users/login');
};

module.exports.signup = (req, res, next) => {
  res.render('users/signup');
};

module.exports.create = (req, res, next) => {
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
        })

        res.render('users/login', {message: 'Check your email for activation'})
    })
    .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          res.render("users/signup", { error: error.errors, user });
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
      .catch(next)
};

module.exports.activateUser = (req, res, next) => {
  User.findOne({_id: req.params.id, "status.token": req.params.token})
    .then(user => {
        if (user) {
            user.status.active = true;

            user.save()
              .then(user => {
                  res.render('users/login', {message : 'Your account has been activated, log in below!' })
              })
              .catch(error => next)

        }else{
            res.render('/login', {message : 'Invalid link'})
        }
    })
    .catch(error => next)

}