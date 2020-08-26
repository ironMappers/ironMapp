const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploads = multer({dest: './public/uploads'})
const passport = require('passport');

const session = require('../middlewares/session.middleware')

const miscController = require('../controllers/misc.controller');
const usersController = require('../controllers/users.controller')

router.get('/', miscController.renderHome);
router.get('/login', usersController.login);
router.get('/signup', usersController.signup);

module.exports = router;