var Vector = require('./Vector')

var norm = [4 / (4 + 4 + 9), 4 / (4 + 4 + 9), 9 / (4 + 4 + 9)];

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
            euclideanDistance += Math.pow((predeterminedVector[i] - dividedVector[i]) * norm[i] , 2)
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