require('../configs/db.config');
const mongoose = require('mongoose');
const faker = require('faker');

const User = require('../models/user.model');
const Station = require('../models/station.model');
const Comment = require('../models/comment.model');
const Favorite = require('../models/favorite.model');
const Rating = require('../models/rating.model');

const users = [];
const stations = [];
const comments = [];
const ratings = [];
const favorites = [];

const ADMIN = {
    username: 'admin',
    email: 'admin@admin.admin',
    password: '123456789',
    status: {
        active: true
    }
};

const randIndex = (arrayName) => {
   return Math.floor(Math.random() * arrayName.length);
   //check dis
};

const createUsers = (amount) => {
    for (let i = 0; i < amount; i++) {
        const newUser = new User({
            username: faker.name.findName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        });

        users.push(newUser);
    }
};


const createStations = (amount) => {
    for (let i = 0; i < amount; i++) {
        const newStation = new Station({
            IDEES: Math.floor(Math.random() * 5000) + 1
        });

        stations.push(newStation);
    }
};

const createFavorites = (amount) => {
    for (let i = 0; i < amount; i++) {
        const newFavorite = new Favorite({
            user: users[randIndex(users)],
            station: stations[randIndex(stations)]
        });

        favorites.push(newFavorite);
    }
};

const createComments = (amount) => {
    for (let i = 0; i < amount; i++) {
        const newComment = new Comment({
            user: users[randIndex(users)],
            station: stations[randIndex(stations)],
            body: faker.lorem.slug()
        });

        comments.push(newComment);
    }
};

createRatings = (amount) => {
    for (let i = 0; i < amount; i++) {
        const newRating = new Rating({
            user: users[randIndex(users)],
            station: stations[randIndex(stations)],
            score: Math.floor(Math.random() * 5) + 1
        });

        ratings.push(newRating);
    }
};

const wipeDatabase = () => {
    return Promise.all([
        User.deleteMany(),
        Station.deleteMany(),
        Comment.deleteMany(),
        Favorite.deleteMany(),
        Rating.deleteMany(),
        User.create(ADMIN)
    ]);
};

const seedDatabase = () => {
    wipeDatabase()
        .then(() => {
            console.log('Database wiped!');

            createUsers(10);
            createStations(40);
            createComments(20);
            createFavorites(20);
            createRatings(10);

            Promise.all([
                User.create(users),
                Station.create(stations),
                Comment.create(comments),
                Favorite.create(favorites),
                Rating.create(ratings),
            ])
                .then(() => console.log('Database seeded'))
                .catch(e => console.error(e));
        })
        .catch(e => console.error(e));
};

seedDatabase();