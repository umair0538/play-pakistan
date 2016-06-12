'use strict';

(function() {

  class ListingController {

    constructor($http, $scope, socket, $location, $stateParams) {
      this.$http = $http;
      this.applications = null;
      this.$location = $location;
      this.category = null;

      if($stateParams.categoryId){
        var listingUrl = "/api/applications/categories/" + $stateParams.categoryId + "/applications";
      }else{
        var listingUrl = "/api/applications/";
      }

      $http.get(listingUrl).then(response => {
        this.applications = response.data;
      });

      if($stateParams.categoryId){
        $http.get('/api/applications/categories/' + $stateParams.categoryId).then(response => {
          this.category = response.data;
        });
      }
    }

    openApplication(id) {
      this.$location.path('/applications/' + id);
    }
  }

  angular.module('storeApp')
    .controller('ListingController', ListingController);
})();
