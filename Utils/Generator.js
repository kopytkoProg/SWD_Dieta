/**
 * Created by michal on 2015-05-16.
 */
var Loader = require('./Loader');


Loader.load(function (err, data)
{
    if (err) console.log(err);
    var i = 0;

    /***
     * @param {Meal} d
     * @param {number} m
     * @return {Meal}
     */
    var createNew = function (d, m)
    {
        var n = d.clone();
        n.id += 1000000 * m;
        n.fats *= m;
        n.proteins *= m;
        n.carbohydrates *= m;
        n.weight *= m;

        n.v = [n.proteins, n.carbohydrates, n.fats];

        n.ingredients.forEach(function (i)
        {
            i.waga *= m;
        });

        n.best = [n];
        return n;
    };

    data.forEach(function (m)
    {
        m.forEach(function (d)
        {

            m.push(createNew(d, 1.5));
            m.push(createNew(d, 2));
            m.push(createNew(d, 2.5));
            // m.push(createNew(d, 3));
        })
    });


    function s()
    {
        data.forEach(function (m)
        {
            m.forEach(function (d)
            {
                d.best = null
            })
        })
    }

    s()
    fs.writeFile('../daniaParsedAndIncreased.json', JSON.stringify(data, null, 4), 'utf8')
    //console.log(JSON.stringify(data, null, 4));

}, '../daniaParsed.json');