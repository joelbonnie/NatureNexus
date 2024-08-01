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

const UNIQUE_ID_NAMES = {
    HABITAT: 'HABITATNAME',
    PARKRANGER: 'RANGERID',
    FACILITY: 'FACILITYNAME',
};

/* GET entity info by ID */
router.get('/:entityName/:id', async function (req, res, next) {
    const { entityName, id } = req.params;
    const id_name = UNIQUE_ID_NAMES[entityName] || `${entityName}id`;

    const query = `select * from ${entityName} where ${id_name} = '${id}'`;
    console.log(query);
    const results = await db.fetchQueryResults(query);
    res.status(200).send(results);
});

module.exports = router;