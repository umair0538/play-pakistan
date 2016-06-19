'use strict';

describe('Component: InstalledAppsComponent', function () {

  // load the controller's module
  beforeEach(module('storeApp'));

  var InstalledAppsComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    InstalledAppsComponent = $componentController('InstalledAppsComponent', {
      $scope: scope
    });
  }));
});
