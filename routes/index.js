var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next)
{
    // var x = asdasd.s/2
    res.render('index', {title: 'Śniadanie'});

});

module.exports = router;
