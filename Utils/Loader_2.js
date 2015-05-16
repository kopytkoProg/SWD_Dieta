/**
 * Created by michal on 2015-05-16.
 */

function Meal()
{

    this.id = null;
    this.type = null;
    this.ingredients = null;
    this.kcal = null;
    this.v = null;
    this.proteins = null;
    this.carbohydrates = null;
    this.fats = null;
    this.weight = null;
    this.best = null;
}


var Loader = {

    names: ["Śniadanie", "II Śniadanie", "Obiad", "Podwieczorek", "Kolacja"],
    /***
     * @param {function(*, Array.<Array.<Meal>>)} callback
     * @param {string} path
     */
    load: function (callback, path)
    {

        if (typeof path != 'string')
            path = './daniaParsedAndIncreased.json';

        fs = require('fs');
        fs.readFile(path, function (err, data)
        {
            if (err)
            {
                callback(err, null);
                return err;
            }

            data = JSON.parse(data);

            data.forEach(function (d)
            {
                d.forEach(function (p)
                {
                    p.best = [p];
                })
            })

            callback(null, data);
        });
    }
};

module.exports = Loader;