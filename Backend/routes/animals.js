var express = require('express');
var router = express.Router();

/* GET animals listing. */
router.get('/', function (req, res, next) {
    res.send('animals!!!!!!!!!!!!!!!!!!!11111!!!!!!111!!!!');
});

module.exports = router;
