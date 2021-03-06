require('dotenv').config({
  path: require('path').resolve(__dirname, '../.env')
});

const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/ironmappers';

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });


process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose terminated');
    process.exit(0);
  });
});
