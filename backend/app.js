const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controller/errorController');

const app = express();

// Controllers import
const musicRouter = require('./routes/musicsRouter');
const albumRouter = require('./routes/albumRouter');
const userRouter = require('./routes/usersRouter');

// Show all requests status when development
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Body Parser for post requests
app.use(express.json());

// Middleware to routes
app.use('/api/v1/musics/', musicRouter);
app.use('/api/v1/albuns/', albumRouter);
app.use('/api/v1/users/', userRouter);

// Handling routes errors
app.all('*', (req, res, next) => {
  next(new AppError(`Could not find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
