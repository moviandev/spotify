const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB_LOCAL = process.env.DATABASE_LOCAL;

console.log(DB_LOCAL);

process.on('uncaughtException', err => {
  global.console.log('SHUTTING DOWN APP UNCAUGHT EXCEPTION');
  global.console.log(err.name, err.message);
  process.exit(1);
});

mongoose.createConnection(DB_LOCAL);

mongoose
  .connect(DB_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(con => global.console.log('DB_LOCAL connection successful'));
const app = require('./app');

const port = process.env.PORT || 3030;
const server = app.listen(port, () => {
  global.console.log(`App Running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  global.console.log('SHUTTING DOWN APP UNHANDLED REJECTION');
  global.console.log(err.name, err.message);
  server.close(() => process.exit(1));
});
