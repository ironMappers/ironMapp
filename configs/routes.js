const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploads = multer({dest: './public/uploads'});
const passport = require('passport');

const session = require('../middlewares/session.middleware');

const miscController = require('../controllers/misc.controller');
const usersController = require('../controllers/users.controller');

router.get('/', miscController.renderHome);
router.get('/login', usersController.renderLogin);
router.get('/signup', usersController.renderSignup);
router.post('/signup', usersController.createUser);
router.get('/users/:id/activate/:token', usersController.activateUser);


module.exports = router;