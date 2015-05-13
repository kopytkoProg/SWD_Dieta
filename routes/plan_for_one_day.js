/**
 * Created by michal on 2015-05-13.
 */

var express = require('express');
var Loader = require('./../Utils/Loader');
var Dieta = require('./../Utils/Dieta');
var router = express.Router();

router.param('v', function (req, res, next, v) {
    console.log('CALLED ONLY ONCE');
    req.params['v'] = JSON.parse(v);
    next();
});


router.get('/:v', function (req, res, next)
{

    var vz = req.params.v;


    Loader.load(function (err, data)
    {
        if (err)
        {
            console.log(err)
            return err;
        }


        var r = Dieta.selectBest(data, vz);
        r.p.forEach(function(e){
            delete e.best;
        });



        res.setHeader('Content-Type', 'application/json;charset=utf-8');
        res.end(JSON.stringify(r, null, 3));
    });
});

module.exports = router;
