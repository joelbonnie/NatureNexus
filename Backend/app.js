let express = require('express');
var cors = require('cors');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

require('dotenv').config();

const db = require('./database/db');
console.log(process.env.ORACLE_USER);
db.initializeConnectionPool();
setTimeout(() => db.fetchAnimalsFromDb().then((r) => console.log(r)), 100);

let indexRouter = require('./routes/index');
let animalsRouter = require('./routes/animals');
let equipmentRouter = require('./routes/equipment');
let facilitiesRouter = require('./routes/facilities');
let habitatsRouter = require('./routes/habitats');
let plantsRouter = require('./routes/plants');
let rangersRouter = require('./routes/rangers');
let visitorsRouter = require('./routes/visitors');
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
app.use('/animals', animalsRouter);
app.use('/statistics', statisticsRouter);

app.use('/equipment', equipmentRouter);
app.use('/facilities', facilitiesRouter);
app.use('/habitats', habitatsRouter);
app.use('/plants', plantsRouter);
app.use('/rangers', rangersRouter);
app.use('/visitors', visitorsRouter);
app.use('/entity', entityRouter);

module.exports = app;
