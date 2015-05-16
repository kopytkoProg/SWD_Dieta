/**
 * Created by michal on 2015-05-13.
 */

var express = require('express');
var Loader = require('./../Utils/Loader_2');
var Dieta = require('./../Utils/Dieta');
var router = express.Router();

router.param('v', function (req, res, next, v)
{
    req.params['v'] = JSON.parse(v);
    next();
});

router.param('isAvg', function (req, res, next, isAvg)
{
    req.params['isAvg'] = isAvg == 'true';
    next();
});

router.get('/:v/:isAvg', function (req, res, next)
    {

        var vz = req.params.v;
        var isAvg = req.params.isAvg;

        Loader.load(function (err, data)
        {
            if (err)
            {
                console.log(err)
                return err;
            }

            var dishesInOneDay = data.length;
            if (!isAvg) for (var i = 0; i < vz.length; i++) vz[i] = (vz[i] / dishesInOneDay);

            console.log(vz);

            var r = Dieta.selectBest(data, vz);
            r.p.forEach(function (e)
            {
                delete e.best;
            });

            res.setHeader('Content-Type', 'application/json;charset=utf-8');
            res.end(JSON.stringify(r, null, 3));
        });
    }
)
;

module.exports = router;
