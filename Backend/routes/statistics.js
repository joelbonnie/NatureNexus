var express = require('express');
var router = express.Router();
const db = require('./../database/db');

/* GET statistics listing. */
router.get('/animalHealth', async function (req, res, next) {
    const query = `SELECT HEALTH, COUNT(ANIMALID) FROM ANIMAL GROUP BY HEALTH`;
    console.log(query);
    const results = await db.fetchQueryResults(query);
    res.status(200).send(results);
});

router.get('/animalSpecies', async function (req, res, next) {
    const query = ` SELECT SPECIESNAME, 
    COUNT(*) FROM ANIMAL GROUP BY SPECIESNAME HAVING COUNT(*) > 1`;
    console.log(query);
    const results = await db.fetchQueryResults(query);
    res.status(200).send(results);
});

router.get('/avgHabitat', async function (req, res, next) {
    const query = `SELECT CEIL(AVG(ANIMALCOUNT)) FROM (SELECT COUNT(A.animalid) AS ANIMALCOUNT, H.habitatname HABITAT_NAME FROM
    ANIMAL A,LIVESIN L,HABITAT H where A.animalid = L.animalid AND
    H.habitatname = L.habitatname GROUP BY H.habitatname)`;
    console.log(query);
    const results = await db.fetchQueryResults(query);
    res.status(200).send(results);
});

router.get('/plantSpecies', async function (req, res, next) {
    const query = `SELECT DISTINCT P.species
    FROM Plant P
    WHERE NOT EXISTS
    ((SELECT DISTINCT 'poor' FROM Plant P2)
    MINUS
    (SELECT trim(P1.health)
    FROM Plant P1
    WHERE P.species=P1.species))`;
    console.log(query);
    const results = await db.fetchQueryResults(query);
    res.status(200).send(results);
});

router.get('/habitatMembers/:habitatName', async function (req, res, next) {
    const { habitatName } = req.params;
    console.log(habitatName);
    const query = `SELECT A.ANIMALID,A.ANIMALNAME FROM ANIMAL A,LIVESIN L,HABITAT H
    where A.animalid = L.animalid AND H.habitatname = L.habitatname AND H.habitatname = :habitatName`;

    // Parametrized inputs for sanitization
    const results = await db.fetchQueryResultsSecure(query, [habitatName]);
    console.log(results);
    res.status(200).send(results);
});

module.exports = router;
