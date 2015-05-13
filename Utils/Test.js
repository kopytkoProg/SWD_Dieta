/**
 * Created by michal on 2015-05-13.
 */


var Loader = require('./Loader');
var Dieta = require('./Dieta');

Loader.load(function (err, meals)
{
    if (err) console.log(err);

    console.log(Dieta.selectBest(meals, [20,20,20]));


})


