(function () {
"use strict";

angular.module('public')
.controller('InfoController', InfoController);

InfoController.$inject = ['MenuService', 'CustomerService'];
function InfoController(MenuService, CustomerService) {
  var infoCtrl = this;

  if (CustomerService.has()) {
    infoCtrl.customer = CustomerService.get();

    var promise = MenuService.getMenuItem(infoCtrl.customer.favoriteMenuNumber);

    promise.then(function (response) {
      infoCtrl.menuItem = response;
    })
    .catch(function (error) {
      console.log('Menu Item was not found!');
    });
  }

  infoCtrl.hasCustomer = function () {
    return CustomerService.has();
  };
}
})();
