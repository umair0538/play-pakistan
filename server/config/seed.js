/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Application from '../api/application/application.model';
import Review from '../api/review/review.model';
var randomWords = require('random-words');

Thing.find({}).removeAsync()
  .then(() => {
    Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
             'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
             'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
             'tests alongside code. Automatic injection of scripts and ' +
             'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
             'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
             'payload, minifies your scripts/css/images, and rewrites asset ' +
             'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    });
  });

User.find({}).removeAsync()
  .then(() => {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });

Application.find({}).removeAsync()
  .then(() => {
    var apps = createApps();
    Application.createAsync(apps)
      .then(() => {
        console.log('finished populating applications');

        Application.findAsync()
          .then(function(applications){
            var total = applications.length;
            var count = 0;
            applications.forEach(function(application){
              var reviews = createReviews(application._id);
              Review.find({}).removeAsync()
                .then(() => {
                  Review.createAsync(reviews)
                    .then(() => {
                      count++;
                      if(count >= total)
                        console.log('finished populating reviews');
                    });
                });
            });
          });
      });
  });

function createApps(){
  var apps = [];
  for(var i = 0; i < 50; i++){
    var rating = ((Math.random() * 5) + 0).toFixed(1);
    var totalRatings = Math.ceil((Math.random() * 1000000) + 1);
    var totalRating = Math.ceil(rating * totalRatings);
    rating = (totalRating/totalRatings).toFixed(1);
    apps.push({
      name: 'Test App' + (Math.floor(Math.random() * 9999) + 1),
      price: {
        currency: 'Rs',
        amount: (Math.floor(Math.random() * 999) + 1)
      },
      description: 'This is the app description',
      media: [{
        type: 'image',
        file: 'image.png',
        uploader: '123',
        createdOn: new Date()
      },{
        type: 'video',
        file: 'video.mp4',
        uploader: '123',
        createdOn: new Date()
      }],
      version: '1.1.2',
      developer: '123',
      lastUpdated: new Date(),
      createdOn: new Date(),
      size: 50,
      downloads: 1000,
      permissions: [{
        name: 'Internet',
        permission: 'internet'
      },{
        name: 'Device Storage',
        permission: 'deviceStorage'
      }],
      rating: rating,
      totalRating: totalRating,
      totalRatings: totalRatings
    });
  }
  return apps;
}

function createReviews(appId){
  var reviews = [];
  for(var i = 0; i < 10; i++){
    reviews.push({
      reviewer: '123',
      application: appId,
      review: randomWords({ exactly: 30, join: ' ' }),
      rating: Math.ceil(Math.random() * 5),
      flagCount: 0,
      flaggedBy: [],
      likeCount: 0,
      likedBy: [],
      unlikeCount: 0,
      unlikedBy: [],
      dateReviewed: new Date(),
      dateUpdated: new Date(),
      device: "123",
      version: "1.1.2"
    });
  }
  return reviews;
}
