const hbs = require('hbs');
const {
    options
} = require('../configs/routes');

hbs.registerHelper('owner', (userId, elementId, options) => {
    if (userId === elementId) {
        return options.fn(this);
    }
    return options.inverse(this);
});

hbs.registerHelper('available', product => {
    if (product) {
        return `${product} €`;
    }
    return 'Unavailable';
});

hbs.registerHelper('date', (date) => {
    const makeDoubleDigit = (fullDate) => fullDate.split(' ').map(num => (num.length < 2) ? '0' + num : num);

    const fullDate = `${date.getDate()} ${date.getMonth() + 1} ${date.getFullYear()}`;
    const formattedDate = makeDoubleDigit(fullDate).join('/');

    const time = `${date.getHours()} ${date.getMinutes()}`;
    const formattedTime = makeDoubleDigit(time).join(':');

    return `${formattedDate} at ${formattedTime}`;
});