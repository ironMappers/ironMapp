const hbs = require('hbs');
const { options } = require('../configs/routes');

hbs.registerHelper('owner', (userId, elementId, options) => {
    if (userId === elementId) {
        return options.fn(this);
    } 
    return options.inverse(this);
});

hbs.registerHelper('date', (date) => {
    //const makeDoubleDigit = (num) => (num < 10) ? '0' + num : num;
    const makeDoubleDigit = (fullDate) => fullDate.split(' ').map(num => (num.length < 2) ? '0' + num : num);
    const d = new Date(date)
  const fullDate =  `${date.getDate()} ${date.getMonth() + 1} ${date.getFullYear()}`;
  const time = `${date.getHours()} ${date.getMinutes()}`;
  const formattedTime = makeDoubleDigit(time).join(':');
  const formattedDate = makeDoubleDigit(fullDate).join('/');

  console.log(formattedDate)
    return `${formattedDate} at ${formattedTime}`;
});
