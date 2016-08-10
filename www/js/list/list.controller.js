angular.module('holomua.controllers')
.controller('ListCtrl', function ($scope, $state, $stateParams) {

  $scope.category = $stateParams.category;
  console.log("list");
  console.log($stateParams);

});
