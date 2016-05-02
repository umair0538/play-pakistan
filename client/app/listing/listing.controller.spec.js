'use strict';

describe('Controller: ListingCtrl', function () {

  // load the controller's module
  beforeEach(module('storeApp'));

  var ListingCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListingCtrl = $controller('ListingCtrl', {
      $scope: scope
    });
  }));
});
