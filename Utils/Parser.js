/**
 * Created by michal on 2015-05-12.
 */

fs = require('fs');

var Parser =
{
    parse: function ()
    {
        fs.readFile('../daniaRaw.json', 'utf8', function (err, data)
        {
            if (err) return console.log(err);
            var arr = JSON.parse(data)
            arr.forEach(function (e)
            {

                e.Składniki = e.Składniki.split(" # ").map(function (e)
                {

                    var s = e.split(" | ");
                    var name = s[0];
                    var waga = s[1];
                    var addr = s[2];


                    return {nazwa: name, waga: waga, addr: addr}
                })

                e.kcal = parseFloat(e.kcal.replace(',', '.'))
                e.B = parseFloat(e.B.replace(',', '.'))
                e.W = parseFloat(e.W.replace(',', '.'))
                e.T = parseFloat(e.T.replace(',', '.'))

            })
            console.log(JSON.stringify(arr, null, 4));

            fs.writeFile('../daniaParsed.json', JSON.stringify(arr, null, 4), 'utf8')
        });

    }
};

Parser.parse();


// module.exports = Parser;