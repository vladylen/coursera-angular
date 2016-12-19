(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemDetailController', ItemDetailController);

ItemDetailController.$inject = ['$stateParams', 'MenuDataService']
function ItemDetailController($stateParams, MenuDataService) {
  var itemDetail = this;

  var promise = MenuDataService.getItemsForCategory($stateParams.categoryShortName);

  promise.then(function (response) {
    itemDetail.items = response;
  })
  .catch(function (error) {
    console.log(error);
  });
}

})();
