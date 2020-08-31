const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploads = multer({dest: './public/uploads'});
const passport = require('../configs/passport.config');

const sessionMiddleware = require('../middlewares/session.middleware');
const miscController = require('../controllers/misc.controller');
const usersController = require('../controllers/users.controller');

/*---------------
    ROUTES
---------------*/
router.get('/', miscController.renderHome);

/*AUTH*/
router.get('/login', usersController.renderLogin);
router.post('/login', usersController.doLogin);
router.get('/logout', usersController.doLogout);

router.get('/signup', usersController.renderSignup);
router.post('/signup', usersController.createUser);

router.post('/signup', usersController.createUser);


/*USER*/
router.get('/users', usersController.renderDashboard);
router.get('/users/:id/activate/:token', usersController.activateUser);


module.exports = router;