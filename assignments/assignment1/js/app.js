(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.meals = "";
  $scope.message = "";

  $scope.checkLunch = function () {
    if ($scope.meals === '') {
      $scope.message = 'Please enter data first';
    } else {
      var meals = $scope.meals.split(',');
      $scope.message = 'Enjoy!';

      if (meals.length > 3) {
          $scope.message = 'Too much!';
      }
    }
  };
}

})();
