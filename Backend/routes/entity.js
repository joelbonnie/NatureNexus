var express = require('express');
var router = express.Router();
const db = require('./../database/db');

/* GET entity listing. */
router.get('/:entityName', async function (req, res, next) {
    const { entityName } = req.params;
    const query = `select * from ${entityName}`;
    console.log(query);
    const results = await db.fetchQueryResults(query);

    res.status(200).send(results);
});

/* GET entity info by ID */
router.get('/:entityName/:id', async function (req, res, next) {
    const { entityName, id } = req.params;
    const query = `select * from ${entityName} where animalID = ${id}`;
    console.log(query);
    const results = await db.fetchQueryResults(query);
    res.status(200).send(results);
});

module.exports = router;
