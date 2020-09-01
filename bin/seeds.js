require('../configs/db.config');
const mongoose = require('mongoose');
const faker = require('faker');

const User = require('../models/user.model');
const Station = require('../models/station.model');
const Comment = require('../models/comment.model');
const Favorite = require('../models/favorite.model');
const Rating = require('../models/rating.model');

const wipeDatabase = () => {
    Promise.all()
}