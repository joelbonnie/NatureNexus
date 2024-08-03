var express = require('express');
var router = express.Router();
const db = require('./../database/db');

/* GET entity listing. */
router.get('/:entityName', async function (req, res, next) {
    const { entityName } = req.params;
    const filter = req.query.filter;

    var query = '';

    if (filter) {
        query = `select * from ${entityName} where ${filter}`;
    } else {
        query = `select * from ${entityName}`;
    }

    console.log(query);

    const results = await db.fetchQueryResults(query);
    res.status(200).send(results);
});

const UNIQUE_ID_NAMES = {
    HABITAT: 'HABITATNAME',
    PARKRANGER: 'RANGERID',
    FACILITY: 'FACILITYNAME',
    RABBIT: 'ANIMALID',
    FROG: 'ANIMALID',
    WOLF: 'ANIMALID',
    OWL: 'ANIMALID',
    MOM: 'animalId_Mom',
    DAD: 'animalId_Dad',
    FOREST: 'HABITATNAME',
    POND: 'HABITATNAME',
    SPECIES: 'SPECIESNAME',
    FAMILY: 'taxonomicalFamily',
};

/* GET specific entity info by ID */
router.get('/:entityName/:id', async function (req, res, next) {
    const { entityName, id } = req.params;
    const attributes = req.query.attributes;

    const id_name = UNIQUE_ID_NAMES[entityName] || `${entityName}id`;

    const query = `select ${attributes} from ${entityName} where ${id_name} = '${id}'`;
    console.log(query);

    const results = await db.fetchQueryResults(query);
    res.status(200).send(results);
});

/* GET entity table's attributes */
router.get('/:entityName/:id/attributeNames', async function (req, res, next) {
    const { entityName } = req.params;

    const query = `select column_name from user_tab_columns where table_name = '${entityName}'`;
    console.log(query);
    const results = await db.fetchQueryResults(query);
    res.status(200).send(results);
});

module.exports = router;
