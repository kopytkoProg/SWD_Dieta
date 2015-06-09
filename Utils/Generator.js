/**
 * Created by michal on 2015-05-16.
 */
var Loader = require('./Loader');


Loader.load(function (err, data)
    {
        if (err) console.log(err);
        var treshold = 700;

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
            var r = 0
            m.forEach(function (d)
            {
                {
                    var n = createNew(d, 1.5);
                    if (n.weight <= treshold) m.push(n);
                    else r++;
                }

                {
                    var n = createNew(d, 2);
                    if (n.weight <= treshold) m.push(n);
                    else r++;
                }
                {
                    var n = createNew(d, 2.5);
                    if (n.weight <= treshold) m.push(n);
                    else r++;
                }
            });

            console.log("deleted: " + r)
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
        fs.writeFile('../daniaParsedAndIncreasedAndLimited.json', JSON.stringify(data, null, 4), 'utf8')
//console.log(JSON.stringify(data, null, 4));

    },
    '../daniaParsed.json'
)
;