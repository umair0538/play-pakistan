'use strict';

class SidebarController {
  //start-non-standard
  menu = [{
    'title': 'Installed',
    'state': '/'
  },{
    'title': 'My Wishlist',
    'state': '/'
  },{
    'title': 'My Account',
    'state': '/'
  }];

  constructor() {
  }
}

angular.module('storeApp')
  .controller('SidebarController', SidebarController);
