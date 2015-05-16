/**
 * Created by michal on 2015-05-13.
 */


myApp.controller('MyApp', function ($scope, $http)
{

    var kcal = function (b, w, t)
    {
        return (b * 4 + w * 4 + t * 9).toFixed(0);
    };

    $scope.plan = [];

    $scope.send = function (v)
    {
        if ($scope.prefered_vector_form.$valid)
        {


            console.log(JSON.stringify(v));

            $http.get('/plan_for_one_day/' + JSON.stringify(v) + '/false').success(function (data, status, headers, config)
            {


                data.sum = data.p.reduce(function (acc, e)
                {
                    for (var i = 0; i < e.v.length; i++) acc[i] += e.v[i]
                    return acc;
                }, [0, 0, 0]).map(function (e)
                {
                    return e.toFixed(2)
                });


                data.avg = data.sum.reduce(function (acc, e)
                {
                    acc.push((e / data.p.length).toFixed(2))
                    return acc;
                }, []);

                data.kcal = kcal(data.sum[0], data.sum[1], data.sum[2]);

                console.log(data);
                $scope.plan = data;

            }).error(function (data, status, headers, config)
            {
                console.log(status);
            });
        }

    };


});