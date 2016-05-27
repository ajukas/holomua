angular.module('holomua.controllers')
  .controller('PlacesCtrl', function ($scope, $state, PlacesService) {

    $scope.currentCity = '';

    $scope.init = function(){
      PlacesService.getCurrentCity().then(function(city){
        $scope.currentCity = city;
      }, function(err){
        console.log(err);
      });
    };

  });
