'use strict';

angular.module('storeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('application', {
        url: '/applications/:id',
        templateUrl: 'app/application/application.html',
        controller: 'ApplicationController',
        controllerAs: 'AppCtrl'
      });
  });
