const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploads = multer({dest: './public/uploads'});
const passport = require('passport');
const axios = require('axios');


const sessionMiddleware = require('../middlewares/session.middleware');
const miscController = require('../controllers/misc.controller');
const usersController = require('../controllers/users.controller');
const fileUploader = require('../configs/cloudinary.config');
const stationsController = require('../controllers/stations.controller');

/*---------------
    ROUTES
---------------*/
router.get('/', miscController.renderHome);

/*AUTH*/
router.get('/login', sessionMiddleware.isNotAuthenticated, usersController.renderLogin);
router.post('/login', sessionMiddleware.isNotAuthenticated, usersController.doLogin);

router.get('/logout', sessionMiddleware.isAuthenticated, usersController.doLogout);

router.get('/signup', sessionMiddleware.isNotAuthenticated, usersController.renderSignup);
router.post('/signup', sessionMiddleware.isNotAuthenticated, fileUploader.single('avatar'), usersController.createUser);
router.get('/users/:id/activate/:token', sessionMiddleware.isAuthenticated, usersController.activateUser);

/*USER*/
router.get('/users/dashboard', sessionMiddleware.isAuthenticated, usersController.renderDashboard);

/*STATIONS*/
router.get('/station/:stationId/:stationDistrict', stationsController.renderStation);


module.exports = router;