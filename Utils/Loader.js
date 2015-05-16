/**
 * Created by michal on 2015-05-13.
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


    /**
     *
     * @return {Meal}
     */
    this.clone = function ()
    {
        var b = this.best;
        this.best = null;
        var txt = JSON.stringify(this);
        this.best = b;
        return JSON.parse(txt);

    };
}

var Loader = {
    /***
     * @param {function(*, Array.<Array.<Meal>>)} callback
     * @param {string} path
     */
    load: function (callback, path)
    {
        var names = ["Śniadanie", "II Śniadanie", "Obiad", "Podwieczorek", "Kolacja"];
        var meals = [[], [], [], [], []];

        if (typeof path != 'string')
            path = './daniaParsed.json';

        fs = require('fs');
        fs.readFile(path, function (err, data)
        {
            if (err)
            {
                callback(err, null);
                return err;
            }

            var arr = JSON.parse(data);
            var id = 0;

            arr.forEach(function (e)
            {
                var m = new Meal();
                m.type = e["Rodzaj posiłku"];

                m.ingredients = e["Składniki"];

                m.kcal = e["kcal"];
                m.proteins = e["B"];
                m.carbohydrates = e["W"];
                m.fats = e["T"];
                m.weight = e["Waga"];
                m.v = [m.proteins, m.carbohydrates, m.fats];
                m.best = [m];
                // console.log(m.type);

                // split waga
                m.ingredients.forEach(function (e)
                {
                    var rx = new RegExp('^([0-9]*) (.*$)');
                    var match = rx.exec(e.waga);
                    e.waga = parseFloat(match[1]);
                    e.jednostka = match[2].trim();

                });

                m.id = id++;

                meals[names.indexOf(m.type)].push(m);
            });

            callback(null, meals);
        });
    }
};

module.exports = Loader;