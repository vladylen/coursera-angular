(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;

  menu.found = [];
  menu.error = "";
  menu.searchTerm = "";

  menu.search = function () {
    if (menu.searchTerm.length === 0) {
      return menu.error = "Nothing found";
    }

    var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);

    promise.then(function (response) {
      if (response.length === 0) {
        menu.error = "Nothing found";
      } else {
        menu.error = "";
        menu.found = response;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  menu.removeItem = function (itemIndex) {
    MenuSearchService.removeItem(itemIndex);
  };

  menu.hasError = function () {
    return menu.error.length > 0;
  }
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var found = [];

  service.getMatchedMenuItems = function (searchTerm) {
    found = [];

    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).
    then(function (response) {
      for (var i = 0; i < response.data.menu_items.length; i++) {
        var item = response.data.menu_items[i];
        if (item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
          found.push(item);
        }
      }

      return found;
    });
  };

  service.removeItem = function (itemIndex) {
    found.splice(itemIndex, 1);
  };
}
})();
