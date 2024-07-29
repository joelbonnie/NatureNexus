var express = require('express');
var router = express.Router();

// TODO remove mock data
const mockData = [
    { id: 0, species: 'cottontail rabbit', health: 'poor' },
    {
        id: 1,
        species: 'british columbia wolf',
        health: 'excellent',
    },
];

/* GET animals listing. */
router.get('/', function (req, res, next) {
    res.status(200).send(mockData);
});

/* GET animal info by ID */
router.get('/:id', function (req, res, next) {
    const { id } = req.params;
    const animal = mockData.filter((a) => a.id === parseInt(id))[0]; // replace this with DB query
    console.log(animal);
    res.status(200).send(animal);
});

module.exports = router;
