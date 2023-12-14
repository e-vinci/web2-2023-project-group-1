const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:3000', 'https://iwezix.github.io'],
};

const authsRouter = require('./routes/auths');
const sitesRouter = require('./routes/sitesPassword');
const leaderboardRouter = require('./routes/leaderboard');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors(corsOptions));

app.use('/auths', authsRouter);
app.use('/sites', sitesRouter);
app.use('/leaderboard', leaderboardRouter);

module.exports = app;
