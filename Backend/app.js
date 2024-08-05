let express = require('express');
var cors = require('cors');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

require('dotenv').config();

const db = require('./database/db');
console.log(process.env.ORACLE_USER);
db.initializeConnectionPool();

let indexRouter = require('./routes/index');
let entityRouter = require('./routes/entity');
let statisticsRouter = require('./routes/statistics');

let app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/statistics', statisticsRouter);
app.use('/entity', entityRouter);

module.exports = app;
