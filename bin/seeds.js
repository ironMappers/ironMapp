require('../configs/db.config');
const mongoose = require('mongoose');
const faker = require('faker');

const User = require('../models/user.model');
const Review = require('../models/review.model');
const Favorite = require('../models/favorite.model');
const Rating = require('../models/rating.model');

const users = [];
const reviews = [];
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
};

const randStation = () => {
    const station = {
        IDEESS: Math.floor(Math.random() * 5600) + 1,
        district: Math.floor(Math.random() * 8000 - 14) + 15
    };

    return station;
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

const createFavorites = (amount) => {
    for (let i = 0; i < amount; i++) {
        const newFavorite = new Favorite({
            user: users[randIndex(users)],
            station: {
                IDEESS:'6341',
                district: '5489',
                address: "Calle San Gregorio, 21 Macotera, Salamanca",
                owner: "PETRONOR"
            }
        });

        favorites.push(newFavorite);
    }
};

const createReviews = (amount) => {
    for (let i = 0; i < amount; i++) {
        const newReview = new Review({
            user: users[randIndex(users)],
            station: randStation(),
            body: faker.lorem.slug()
        });

        reviews.push(newReview);
    }
};

const createRatings = (amount) => {
    for (let i = 0; i < amount; i++) {
        const newRating = new Rating({
            user: users[randIndex(users)],
            station: randStation(),
            score: Math.floor(Math.random() * 5) + 1
        });

        ratings.push(newRating);
    }
};

const wipeDatabase = () => {
    return Promise.all([
        User.deleteMany(),
        Review.deleteMany(),
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
            createReviews(20);
            createFavorites(20);
            createRatings(10);

            Promise.all([
                User.create(users),
                Review.create(reviews),
                Favorite.create(favorites),
                Rating.create(ratings),
            ])
                .then(() => {
                    console.log('Database seeded');
                    mongoose.connection.close();
                })
                .catch(e => console.error(e));
        })
        .catch(e => console.error(e));
};

seedDatabase();