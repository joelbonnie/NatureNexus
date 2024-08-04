var express = require('express');
var router = express.Router();
const db = require('./../database/db');

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
    FAMILY: 'TAXONOMICALFAMILY',
    AREA: 'COORDINATES',
    PLANTEDBY: 'PLANTID',
    VISITOR: 'PASSID',
    MANAGES: ['RANGERID', 'FACILITYNAME'],
    LIVESIN: ['ANIMALID', 'HABITATNAME'],
    MONITORS: ['HABITATNAME', 'RANGERID'],
};

/* GET entity table's attributes */
router.get('/:entityName/attributeNames', async function (req, res, next) {
    const { entityName } = req.params;

    // TODO: the commented-out code could be used if we decide we want to
    // sometimes prevent the user from entering their own primary key.

    // const { includePrimaryKey } = req.query.includePrimaryKey;
    // var query = '';
    // if (includePrimaryKey === 'true') {
    //     query = `select column_name from user_tab_columns where table_name = '${entityName}'`;
    // } else {
    //     const id_name = UNIQUE_ID_NAMES[entityName] || `${entityName}ID`;
    //     query = `select column_name from user_tab_columns where table_name = '${entityName}' and column_name <> '${id_name}'`;
    // }

    const query = `select column_name from user_tab_columns where table_name = '${entityName}'`;
    console.log(query);

    db.fetchQueryResults(query)
        .then((results) => res.status(200).send(results))
        .catch((e) => {
            console.log('Error:', e);
            res.status(500).send(e);
        });
});

router.post('/:entityName/insert', async function (req, res, next) {
    const { entityName } = req.params;
    const values = req.body;

    const valuesToInsert = Object.entries(values).filter(([col, val]) => {
        return val !== '';
    });
    const columns = valuesToInsert.map(([col, val]) => col).join(',');
    const vals = valuesToInsert.map(([col, val]) => `'${val}'`).join(',');
    const id_name =
        UNIQUE_ID_NAMES[entityName] || `${entityName}id`.toUpperCase();

    // TODO: these two lines were for if the pkey is automatically incremented. not
    // sure if we want to implement that.
    // const pkeyQuery = `(select max(${id_name}) from ${entityName})+1`;
    // const query = `insert into ${entityName} (${id_name},${columns}) values (${pkeyQuery},${vals})`;

    const query = `insert into ${entityName} (${columns}) values (${vals})`;

    console.log(query);

    db.fetchQueryResults(query)
        .then((results) => res.status(200).send(results))
        .catch((e) => {
            console.log('Error:', e);
            res.status(500).send(e);
        });
    // const results = await db.fetchQueryResults(query);
    // await db.fetchQueryResults('commit'); // TODO: this currently doesn't work. figure out how to commit
});

/* GET specific entity info by ID */
router.get('/:entityName/:id', async function (req, res, next) {
    const { entityName, id: id_value } = req.params;
    const attributes = req.query.attributes;

    var query = `select ${attributes} from ${entityName} where `;

    if (id_value.includes('_')) {
        // Entity has multiple primary keys
        const id_values = id_value.split('_');
        const id_keys = UNIQUE_ID_NAMES[entityName];

        const whereClauses = [];
        for (var i = 0; i < id_keys.length; i++) {
            whereClauses.push(`${id_keys[i]} = '${id_values[i]}'`);
        }

        query = query.concat(whereClauses.join(' and '));
    } else {
        // Entity only has one primary key
        const id_key =
            UNIQUE_ID_NAMES[entityName] || `${entityName}id`.toUpperCase();
        const whereClause = `${id_key} = '${id_value}'`;

        query = query.concat(whereClause);
    }

    console.log(query);
    db.fetchQueryResults(query)
        .then((results) => res.status(200).send(results))
        .catch((e) => {
            console.log('Error:', e);
            res.status(500).send(e);
        });
});

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

    db.fetchQueryResults(query)
        .then((results) => res.status(200).send(results))
        .catch((e) => {
            console.log('Error:', e);
            res.status(500).send(e);
        });
});

module.exports = router;
