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
router.get('/login', sessionMiddleware.isNotAuthenticated, usersController.renderLogin);
router.post('/login', sessionMiddleware.isNotAuthenticated, usersController.doLogin);

router.get('/logout', sessionMiddleware.isAuthenticated, usersController.doLogout);

router.get('/signup', sessionMiddleware.isNotAuthenticated, usersController.renderSignup);
router.post('/signup', sessionMiddleware.isNotAuthenticated, usersController.createUser);

/*USER*/
router.get('/users/dashboard', sessionMiddleware.isAuthenticated, usersController.renderDashboard);
router.get('/users/:id/activate/:token', usersController.activateUser);


module.exports = router;