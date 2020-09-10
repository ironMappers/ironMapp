const hbs = require('hbs');
const { options } = require('../configs/routes');

hbs.registerHelper('owner', (userId, elementId, options) => {
    console.log(userId);
    console.log(elementId);
    if (userId === elementId) {
        return options.fn(this);
    } 
    return options.inverse(this);
});