'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth, $http) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    this.categories;

    $http.get('/api/applications/categories').then(response => {
      this.categories = response.data;
    });
  }
}

angular.module('storeApp')
  .controller('NavbarController', NavbarController);
