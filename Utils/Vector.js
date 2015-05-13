/**
 * Created by michal on 2015-05-13.
 */


Vector = {

    add: function (v1, v2)
    {
        var result = [];
        for (var i = 0; i < v1.length; i++)
        {
            result.push(v1[i] + v2[i]);
        }
        return result;
    },

    subtract: function (v1, v2)
    {
        var result = [];
        for (var i = 0; i < v1.length; i++)
        {
            result.push(v1[i] - v2[i]);
        }
        return result;
    },

    divide: function (v, k)
    {
        var result = [];
        for (var i = 0; i < v.length; i++)
        {
            result.push(v[i] / k);
        }
        return result;
    }
}

module.exports = Vector;