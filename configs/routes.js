const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploads = multer({dest: './public/uploads'})
const passport = require('passport');

const miscController = require('../controllers/misc.controller');

router.get('/', miscController.renderHome);

module.exports = router;