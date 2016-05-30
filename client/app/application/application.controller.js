'use strict';

(function() {

  class ApplicationController {

    constructor($http, $scope, socket, $stateParams, $modal, $window, Auth) {
      this.$http = $http;
      this.application = null;
      this.reviews = [];
      this.$scope = $scope;
      this.$modal = $modal;
      this.$window = $window;
      this.userReview = null;
      this.user = null;
      this.appInstalled = false;

      if(Auth.isLoggedIn()){
        this.user = Auth.getCurrentUser();
      }

      $http.get('/api/applications/' + $stateParams.id).then(response => {
        this.application = response.data;
        this.updateRatingBars();
        this.isInstalled();
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

    updateRatingBars() {
      var self = this;
      setTimeout(function(){
        $(".rating-five").css("width", self.application.fiveStar / self.application.totalRatings * 100 + "%")
        $(".rating-four").css("width", self.application.fourStar / self.application.totalRatings * 100 + "%")
        $(".rating-three").css("width", self.application.threeStar / self.application.totalRatings * 100 + "%")
        $(".rating-two").css("width", self.application.twoStar / self.application.totalRatings * 100 + "%")
        $(".rating-one").css("width", self.application.oneStar / self.application.totalRatings * 100 + "%")
      }, 10)
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

    download(){
      if(this.user){
        this.$window.open(this.application.downloadURL, '_blank');
        this.$http.post('/api/users/' + this.user._id + '/applications/' + this.application._id,
          {version: this.application.version})
          .then(response => {
          });
      }else{
        alert("Please login to download");
      }
    }

    isInstalled(){
      if(this.user){
        this.$http.get('/api/users/' + this.user._id + '/applications/').then(response => {
          var userApplications = response.data;
          var isInstalled = false;
          var applicationId = this.application._id;
          userApplications.forEach(function(app){
            if(app.applicationId == applicationId){
              isInstalled = true;
              return;
            }
          });
          if(isInstalled)
            this.appInstalled = true;
        });
      }
    }
  }

  angular.module('storeApp')
    .controller('ApplicationController', ApplicationController);
})();
