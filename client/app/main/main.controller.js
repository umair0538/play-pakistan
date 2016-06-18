'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket, $location) {
    this.$http = $http;
    this.trending = [];
    this.topFree = [];
    this.topPaid = [];
    this.$location = $location;

    $http.get('/api/applications/top/free').then(response => {
      this.topFree = response.data;
    });

    $http.get('/api/applications/top/paid').then(response => {
      this.topPaid = response.data;
    });

    $http.get('/api/applications/top/trending').then(response => {
      this.trending = response.data;
    });
  }

  openApplication(id) {
    this.$location.path('/applications/' + id);
  }
}

angular.module('storeApp')
  .controller('MainController', MainController);
})();
