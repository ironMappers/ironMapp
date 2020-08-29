const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploads = multer({dest: './public/uploads'});
const session = require('../middlewares/session.middleware');
const passport = require('../configs/passport.config');

const miscController = require('../controllers/misc.controller');
const usersController = require('../controllers/users.controller');

/*---------------
    ROUTES
---------------*/
router.get('/', miscController.renderHome);

/*AUTH*/
router.get('/login', usersController.renderLogin);
router.post('/login', passport.authenticate('local'), usersController.doLogin);

router.get('/signup', usersController.renderSignup);
router.post('/signup', usersController.createUser);

module.exports = router;