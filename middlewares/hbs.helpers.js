const hbs = require('hbs');
const { options } = require('../configs/routes');

hbs.registerHelper('owner', (userId, elementId, options) => {
    if (userId === elementId) {
        return options.fn(this);
    } 
    return options.inverse(this);
});