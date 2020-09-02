const expressSession = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(expressSession);

const session = expressSession({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: false, 
        httpOnly: true,
        maxAge: Number(process.env.SESSION_MAX_AGE) || 3600000
    },
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: Number(process.env.SESSION_MAX_AGE) || 3600
    })
});

module.exports = session;