var express = require('express');
var router = express.Router();
const db = require('../database/db');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET tables list. */
router.get('/tables', async function (req, res, next) {
    res.status(200).send(await db.fetchTablesFromDb());
});

module.exports = router;
