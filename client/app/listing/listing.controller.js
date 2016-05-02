'use strict';

(function() {

  class ListingController {

    constructor($http, $scope, socket, $location) {
      this.$http = $http;
      this.applications = [];
      this.$location = $location;

      $http.get('/api/applications').then(response => {
        this.applications = response.data;
      });
    }

    openApplication(id) {
      this.$location.path('/applications/' + id);
    }
  }

  angular.module('storeApp')
    .controller('ListingController', ListingController);
})();
