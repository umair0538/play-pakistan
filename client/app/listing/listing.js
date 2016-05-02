'use strict';

angular.module('storeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('listing', {
        url: '/listings',
        templateUrl: 'app/listing/listing.html',
        controller: 'ListingController',
        controllerAs: 'ListingCtrl'
      });
  });
