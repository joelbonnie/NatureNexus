var express = require('express');
var router = express.Router();

const mockData = [
    { id: 0, health: 'good' },
    { id: 1, health: 'mid' },
];

/* GET plants listing. */
router.get('/', function (req, res, next) {
    res.send(mockData);
});

/* GET plant info by ID */
router.get('/:id', function (req, res, next) {
    const { id } = req.params;
    const plant = mockData.filter((a) => a.id === parseInt(id))[0]; // replace this with DB query
    console.log(plant);
    res.status(200).send(plant);
});

module.exports = router;
