require('cookie-parser');
require('dotenv');
require('./configs/db.config');
const express = require('express');
const app = express();
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
//const session = require('./configs/session.config');
//const passport = require('./configs/passport.config');

app.use(express.urlencoded({extended: false}));
app.use(express.static('./public'));
app.use(cookieParser());
//app.use(session);
//app.use(passport);


/*VIEW ENGINE SETUP*/
app.set('views', './views');
app.set('view engine', 'hbs');
hbs.registerPartials('./views/partials');


/*ROUTING*/
const routes = require('./configs/routes.js');
app.use('/', routes);

app.listen(3000, () => {
    console.log('Server up and running!');
});
