(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', MenuItemsDirective);

function MenuItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: MenuItemsDirectiveController,
    controllerAs: 'menu',
    bindToController: true,
    link: MenuItemsDirectiveLink,
    transclude: true
  };

  return ddo;
}

function MenuItemsDirectiveLink(scope, element, attrs, controller) {
  scope.$watch('menu.emptyList()', function (newValue, oldValue) {
    if (element.find('div.error').length > 0) {
      if (newValue === true) {
        element.find('div.error').show();
      } else {
        element.find('div.error').hide();
      }
    }
  });
}

function MenuItemsDirectiveController() {
  var menu = this;

  menu.emptyList = function () {
    return !menu.items.length > 0;
  };
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;

  menu.found = [];
  menu.error = "";
  menu.searchTerm = "";

  menu.search = function () {
    if (menu.searchTerm.length === 0) {
      menu.found = [];

      return menu.error = "Nothing found";
    }

    var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);

    promise.then(function (response) {
      if (response.length === 0) {
        menu.error = "Nothing found";
      } else {
        menu.error = "";
      }

      menu.found = response;
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
