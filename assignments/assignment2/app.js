(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var vm = this;

  vm.items = ShoppingListCheckOffService.getToBuyItems();
  vm.buy = function (itemIndex) {
    ShoppingListCheckOffService.buy(itemIndex);
  }
  vm.isEmpty = function () {
    return ShoppingListCheckOffService.getToBuyItems().length === 0;
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var vm = this;

  vm.items = ShoppingListCheckOffService.getBoughtItems();
  vm.isEmpty = function () {
    return ShoppingListCheckOffService.getBoughtItems().length === 0;
  }
}

function ShoppingListCheckOffService() {
  var service = this;
  var toBuy = [];
  var bought = [];

  service.buy = function (itemIndex) {
    bought.push(toBuy[itemIndex]);
    toBuy.splice(itemIndex, 1);
  };

  service.getToBuyItems = function () {
    return toBuy;
  };

  service.getBoughtItems = function () {
    return bought;
  };

  var init = function () {
    addItem("cookies", "10");
    addItem("milk", "2");
    addItem("cheese", "1");
    addItem("apple", "10");
    addItem("coffee", "2");
  };
  var addItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    toBuy.push(item);
  };
  init();
}
})();
