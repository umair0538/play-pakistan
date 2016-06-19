'use strict';

(function() {

  class InstalledAppsController {

    constructor($http, $scope, socket, $location, Auth) {
      this.$http = $http;
      this.installed = null;
      this.$location = $location;
      this.user = null;

      if(Auth.isLoggedIn()){
        this.user = Auth.getCurrentUser();
      }

      $http.get('/api/users/' + this.user._id + '/applications').then(response => {
        this.installed = response.data;
      });
    }

    openApplication(id) {
      this.$location.path('/applications/' + id);
    }
  }

  angular.module('storeApp')
    .controller('InstalledAppsController', InstalledAppsController);
})();
