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

router.get('/login/google', sessionMiddleware.isNotAuthenticated, usersController.loginGoogle);
router.get('/login/slack', sessionMiddleware.isNotAuthenticated, usersController.loginSlack);

router.get('/login', sessionMiddleware.isNotAuthenticated, usersController.renderLogin);
router.post('/login', sessionMiddleware.isNotAuthenticated, usersController.doLogin);

router.get('/logout', usersController.doLogout);

router.get('/signup', sessionMiddleware.isNotAuthenticated, usersController.renderSignup);
router.post('/signup', sessionMiddleware.isNotAuthenticated, fileUploader.single('avatar'), usersController.createUser);

router.get('/users/:id/activate/:token', usersController.activateUser);
router.get('/users/email', usersController.reSendValidationEmail);

/*USER*/
router.get('/users/dashboard', sessionMiddleware.isAuthenticated, usersController.renderDashboard);
router.get('/users/:id/edit', sessionMiddleware.isAuthenticated, usersController.renderEditForm);
router.post('/users/:id/edit', sessionMiddleware.isAuthenticated, fileUploader.single('avatar'), usersController.updateUser);  
router.post('/users/:id/delete', sessionMiddleware.isAuthenticated, usersController.deleteUser); 

/*STATIONS*/
router.get('/station/:stationId/:stationDistrict', stationsController.renderStation);

/*FEATURES*/
router.post('/review/create/:stationId/:stationDistrict', sessionMiddleware.isAuthenticated, miscController.createReview);
router.patch('/review/:id/:ownerId', sessionMiddleware.isAuthor, miscController.editReview);
router.delete('/review/:id/:ownerId', sessionMiddleware.isAuthor, miscController.deleteReview);
router.put('/rating', sessionMiddleware.isAuthenticated, miscController.doRating);
router.put('/favorite', sessionMiddleware.isAuthenticated, miscController.doFavorite);


module.exports = router;
