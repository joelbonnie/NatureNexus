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
    const vals = valuesToInsert
        .map(([col, val]) => {
            if (col === 'LASTSEEN' || col.includes('DATE')) {
                return `DATE '${val}'`;
            } else {
                return `'${val}'`;
            }
        })
        .join(',');
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

router.post('/:entityName/:id/update', (req, res, next) => {
    const { entityName, id } = req.params;
    const values = req.body;

    const changes = Object.entries(values)
        .map(([col, val]) => {
            if (col === 'LASTSEEN' || col.includes('DATE')) {
                return `${col} = DATE '${val}'`;
            } else {
                return `${col} = '${val}'`;
            }
        })
        .join(', ');

    const query = `UPDATE ${entityName} SET ${changes} WHERE ${getWhereClauses(
        id,
        entityName
    )}`;
    console.log(query);

    db.fetchQueryResults(query)
        .then((results) => res.status(200).send(results))
        .catch((e) => {
            console.log('Error:', e);
            res.status(500).send(e);
        });
});

/* DELETE entity by ID*/
router.delete('/:entityName/:id/delete', async function (req, res, next) {
    const { entityName, id: id_value } = req.params;

    var query = `delete from ${entityName} where ${getWhereClauses(
        id_value,
        entityName
    )}`;

    console.log(query);
    const results = await db.fetchQueryResults(query);
    res.status(200).send(results);
});

/* GET specific entity info by ID */
router.get('/:entityName/:id', async function (req, res, next) {
    const { entityName, id: id_value } = req.params;
    const attributes =
        req.query.attributes === 'all' ? '*' : req.query.attributes;

    var query = `select ${attributes} from ${entityName} where ${getWhereClauses(
        id_value,
        entityName
    )}`;

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

function getWhereClauses(id_value, entityName) {
    if (id_value.includes('_')) {
        // Entity has multiple primary keys
        const id_values = id_value.split('_');
        const id_keys = UNIQUE_ID_NAMES[entityName];

        const whereClauses = [];
        for (var i = 0; i < id_keys.length; i++) {
            whereClauses.push(`${id_keys[i]} = '${id_values[i]}'`);
        }

        return whereClauses.join(' and ');
    } else {
        // Entity only has one primary key
        const id_key =
            UNIQUE_ID_NAMES[entityName] || `${entityName}id`.toUpperCase();

        return `${id_key} = '${id_value}'`;
    }
}
module.exports = router;
