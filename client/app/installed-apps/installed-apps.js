'use strict';

angular.module('storeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('installed-apps', {
        url: '/installed',
        templateUrl: 'app/installed-apps/installed-apps.html',
        controller: 'InstalledAppsController',
        controllerAs: 'InstalledCtrl'
      });
  });
