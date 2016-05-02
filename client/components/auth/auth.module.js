'use strict';

angular.module('storeApp.auth', [
  'storeApp.constants',
  'storeApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
