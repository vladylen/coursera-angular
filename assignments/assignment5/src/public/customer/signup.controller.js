(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['MenuService', 'CustomerService'];
function SignupController(MenuService, CustomerService) {
  var signupCtrl = this;

  if (CustomerService.has()) {
    signupCtrl.customer = CustomerService.get();
    signupCtrl.customerWasSaved = true;
  } else {
    signupCtrl.customerWasSaved = false;
  }

  signupCtrl.favoriteMenuNumberError = false;

  signupCtrl.submit = function () {
    var promise = MenuService.getMenuItem(signupCtrl.customer.favoriteMenuNumber);

    promise.then(function (response) {
      signupCtrl.favoriteMenuNumberError = false;
      signupCtrl.customerWasSaved = true;
      CustomerService.save(signupCtrl.customer);
    })
    .catch(function (error) {
      signupCtrl.favoriteMenuNumberError = true;
      signupCtrl.customerWasSaved = false;
      CustomerService.reset();
    });
  };
}


})();
