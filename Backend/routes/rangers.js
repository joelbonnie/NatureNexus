var express = require('express');
var router = express.Router();

const mockData = []; // TODO remove and replace with DB query

/* GET rangers listing. */
router.get('/', function (req, res, next) {
    res.status(200).send(mockData);
});

/* GET ranger info by ID */
router.get('/:id', function (req, res, next) {
    const { id } = req.params;
    // TODO implement DB query
    res.status(200).send({});
});

module.exports = router;
