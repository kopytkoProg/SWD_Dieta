/**
 * Created by michal on 2015-05-13.
 */

function Meal()
{
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
    load: function (callback)
    {
        var names = ["Śniadanie", "II Śniadanie", "Obiad", "Podwieczorek", "Kolacja"];
        var meals = [[], [], [], [], []];

        fs = require('fs');
        fs.readFile('../daniaParsed.json', function (err, data)
        {
            if (err) callback(err, null);

            var arr = JSON.parse(data);

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
                meals[names.indexOf(m.type)].push(m);
            });

            callback(null, meals);
        });
    }
};

module.exports = Loader;