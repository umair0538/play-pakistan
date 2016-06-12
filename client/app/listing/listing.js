'use strict';

angular.module('storeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('listing', {
        url: '/listings',
        templateUrl: 'app/listing/listing.html',
        controller: 'ListingController',
        controllerAs: 'ListingCtrl'
      })
      .state('category-listing', {
        url: '/listings/category/:categoryId',
        templateUrl: 'app/listing/listing.html',
        controller: 'ListingController',
        controllerAs: 'ListingCtrl'
      });
  });
