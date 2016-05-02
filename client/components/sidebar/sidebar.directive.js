'use strict';

angular.module('storeApp')
  .directive('sidebar', () => ({
    templateUrl: 'components/sidebar/sidebar.html',
    restrict: 'E',
    controller: 'SidebarController',
    controllerAs: 'side'
  }));
