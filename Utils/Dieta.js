var Vector = require('./Vector')

/****
 * 1 gram białka: 4 kCal
 * 1 gram węglowodanów: 4 kCal
 * 1 gram tłuszczu: 9 kCal
 *
 * W diecie: Białko 15%, Tłuszcz 30%, Węglowodany 55% (Procentowa wartość kcal)
 *
 *
 *
 *  norm = normalizacja([4 * 0.15, 4 * 0.55, 9 * 0.30])
 * @type {number[]}
 */

// var norm = [0.109, 0.4, 0.490];

var Dieta = {


    g: function (meals, predeterminedVector)
    {
        var v = [0, 0, 0];
        for (var i = 0; i < meals.length; i++)
        {
            v = Vector.add(v, meals[i].v);
        }
        var dividedVector = Vector.divide(v, meals.length);
        var euclideanDistance = 0;
        for (var i = 0; i < predeterminedVector.length; i++)
        {
            euclideanDistance += Math.pow((predeterminedVector[i] - dividedVector[i]) /* norm[i]*/, 2)
        }
        euclideanDistance = Math.sqrt(euclideanDistance);

        return euclideanDistance;
    },

    selectBest: function (meals, predeterminedVector)
    {
        for (var i = meals.length - 2; i >= 0; i--)
        {
            for (var j = 0; j < meals[i].length; j++)
            {
                var best = null;
                for (var k = 0; k < meals[i + 1].length; k++)
                {
                    //console.log(meals[i+1][k]);
                    var path = meals[i + 1][k].best.slice(0);
                    path.unshift(meals[i][j]);
                    var distance = Dieta.g(path, predeterminedVector);
                    if (best == null || best.g > distance)
                    {
                        best = {g: distance, p: path};
                    }
                }
                meals[i][j].best = best.p;
            }
        }

        var best = null;
        for (var i = 0; i < meals[0].length; i++)
        {
            var path = meals[0][i].best;
            var distance = Dieta.g(path, predeterminedVector);
            if (best == null || best.g > distance)
            {
                best = {g: distance, p: path};
            }
        }
        return best;
    }
};


module.exports = Dieta;