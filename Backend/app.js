let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let animalsRouter = require('./routes/animals');
let equipmentRouter = require('./routes/equipment');
let facilitiesRouter = require('./routes/facilities');
let habitatsRouter = require('./routes/habitats');
let plantsRouter = require('./routes/plants');
let rangersRouter = require('./routes/rangers');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/animals', animalsRouter);

app.use('/equipment', equipmentRouter);
app.use('/facilities', facilitiesRouter);
app.use('/habitats', habitatsRouter);
app.use('/plants', plantsRouter);
app.use('/rangers', rangersRouter);

module.exports = app;
