'use strict';

(function() {

  class ApplicationController {

    constructor($http, $scope, socket, $stateParams, $modal) {
      this.$http = $http;
      this.application = [];
      this.reviews = [];
      this.$scope = $scope;
      this.$modal = $modal;
      this.userReview = null;

      $http.get('/api/applications/' + $stateParams.id).then(response => {
        this.application = response.data;
      });

      $http.get('/api/applications/' + $stateParams.id + '/reviews').then(response => {
        this.reviews = response.data;
      });

      $http.get('/api/applications/' + $stateParams.id + '/reviews?userId=123456').then(response => {
        var newReview = {
          reviewer: '123456',
          application: $stateParams.id,
          review: '',
          rating: 1,
          flagCount: 0,
          likeCount: 0,
          unlikeCount: 0,
          dateReviewed: new Date(),
          dateUpdated: new Date(),
          version: this.application.version
        };
        this.userReview = response.data[0] || newReview;
      });
    }

    saveReview(){
      if(!this.userReview._id)
        this.createReview();
      else
        this.updateReview();
    }

    updateReview(){
      this.$http.put('/api/applications/' + this.application._id + '/reviews/' + this.userReview._id, this.userReview)
      .then(response => {
        this.$http.get('/api/applications/' + this.application._id + '/reviews').then(response => {
          this.reviews = response.data;
        });
      });
    }

    createReview(){
      this.$http.post('/api/applications/' + this.application._id + '/reviews', this.userReview)
      .then(response => {
        this.$http.get('/api/applications/' + this.application._id + '/reviews').then(response => {
          this.reviews = response.data;
        });
      });
    }

    openReviewModal(){
      this.$modal.open({
        templateUrl: 'app/application/review-modal.html',
        windowClass: 'ApplicationController',
        scope: this.$scope
      });
    }

    userRating(value){
      // user changed rating
    }
  }

  angular.module('storeApp')
    .controller('ApplicationController', ApplicationController);
})();
