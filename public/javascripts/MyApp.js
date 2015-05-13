/**
 * Created by michal on 2015-05-13.
 */


myApp.controller('MyApp', function ($scope, $http)
{
    $scope.v = [0, 0, 0];
    $scope.plan = [];

    $scope.send = function (v)
    {
        if ($scope.prefered_vector_form.$valid)
        {
            console.log(JSON.stringify(v));

            $http.get('/plan_for_one_day/' + JSON.stringify(v)).success(function (data, status, headers, config)
            {
                console.log(data);
                $scope.plan = data;
            }).error(function (data, status, headers, config)
            {
                console.log(status);
            });
        }

    };


});