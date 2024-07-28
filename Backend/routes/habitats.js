var express = require('express');
var router = express.Router();

const mockData = [
    { id: 0, name: 'Becker Forest' },
    { id: 1, name: 'Peddlehead Lake' },
    { id: 2, name: 'Becker Lake' },
];

/* GET habitats listing. */
router.get('/', function (req, res, next) {
    res.status(200).send(mockData);
});

/* GET habitat info by ID */
router.get('/:id', function (req, res, next) {
    const { id } = req.params;
    const habitat = mockData.filter((a) => a.id === parseInt(id))[0]; // replace this with DB query
    console.log(habitat);
    res.status(200).send(habitat);
});

module.exports = router;
