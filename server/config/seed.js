/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Application from '../api/application/application.model';
import Review from '../api/review/review.model';
import Category from '../api/application/application-category.model';
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

var categoryIds = [
  "books",
  "business",
  "communication",
  "education",
  "entertainment",
  "finance",
  "health",
  "lifestyle",
  "Wallpaper",
  "media",
  "medical",
  "music",
  "news",
  "photography",
  "shopping",
  "social",
  "sports",
  "tools",
  "travel",
  "weather",
  "widgets",
  "games",
  "family"
];

Category.find({}).removeAsync()
  .then(() => {
    Category.createAsync({
        _id: categoryIds[0],
        name: 'Books',
        description: 'This is books category',
        createdOn: new Date(),
        lastUpdated: new Date()
      }, {
        _id: categoryIds[1],
        name: 'Business',
        description: 'This is business category',
        createdOn: new Date(),
        lastUpdated: new Date()
      }, {
        _id: categoryIds[2],
        name: 'Communication',
        description: 'This is communication category',
        createdOn: new Date(),
        lastUpdated: new Date()
      }, {
        _id: categoryIds[3],
        name: 'Education',
        description: 'This is education category',
        createdOn: new Date(),
        lastUpdated: new Date()
      }, {
        _id: categoryIds[4],
        name: 'Entertainment',
        description: 'This is entertainment category',
        createdOn: new Date(),
        lastUpdated: new Date()
      }, {
        _id: categoryIds[5],
        name: 'Finance',
        description: 'This is finance category',
        createdOn: new Date(),
        lastUpdated: new Date()
      }, {
        _id: categoryIds[6],
        name: 'Health',
        description: 'This is health category',
        createdOn: new Date(),
        lastUpdated: new Date()
      }, {
        _id: categoryIds[7],
        name: 'Lifestyle',
        description: 'This is lifestyle category',
        createdOn: new Date(),
        lastUpdated: new Date()
      }, {
        _id: categoryIds[8],
        name: 'Wallpaper',
        description: 'This is wallpaper category',
        createdOn: new Date(),
        lastUpdated: new Date()
      }, {
        _id: categoryIds[9],
        name: 'Media',
        description: 'This is media category',
        createdOn: new Date(),
        lastUpdated: new Date()
      }, {
        _id: categoryIds[10],
        name: 'Medical',
        description: 'This is medical category',
        createdOn: new Date(),
        lastUpdated: new Date()
      }, {
        _id: categoryIds[11],
        name: 'Music',
        description: 'This is music category',
        createdOn: new Date(),
        lastUpdated: new Date()
      }, {
        _id: categoryIds[12],
        name: 'News',
        description: 'This is news category',
        createdOn: new Date(),
        lastUpdated: new Date()
      }, {
        _id: categoryIds[13],
        name: 'Photography',
        description: 'This is photography category',
        createdOn: new Date(),
        lastUpdated: new Date()
      }, {
        _id: categoryIds[14],
        name: 'Shopping',
        description: 'This is shopping category',
        createdOn: new Date(),
        lastUpdated: new Date()
      }, {
        _id: categoryIds[15],
        name: 'Social',
        description: 'This is social category',
        createdOn: new Date(),
        lastUpdated: new Date()
      }, {
        _id: categoryIds[16],
        name: 'Sports',
        description: 'This is sports category',
        createdOn: new Date(),
        lastUpdated: new Date()
      }, {
        _id: categoryIds[17],
        name: 'Tools',
        description: 'This is tools category',
        createdOn: new Date(),
        lastUpdated: new Date()
      }, {
        _id: categoryIds[18],
        name: 'Travel',
        description: 'This is travel category',
        createdOn: new Date(),
        lastUpdated: new Date()
      }, {
        _id: categoryIds[19],
        name: 'Weather',
        description: 'This is weather category',
        createdOn: new Date(),
        lastUpdated: new Date()
      }, {
        _id: categoryIds[20],
        name: 'Widgets',
        description: 'This is widgets category',
        createdOn: new Date(),
        lastUpdated: new Date()
      }, {
        _id: categoryIds[21],
        name: 'Games',
        description: 'This is games category',
        createdOn: new Date(),
        lastUpdated: new Date()
      }, {
        _id: categoryIds[22],
        name: 'Family',
        description: 'This is family category',
        createdOn: new Date(),
        lastUpdated: new Date()
      })
      .then(() => {
        console.log('finished populating categories');
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
    var categoryId = Math.ceil((Math.random() * 22) + 0);
    var paid = Math.round(Math.random());
    var isPaid = false;
    if(paid > 0)
      isPaid = true;
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
      totalRatings: totalRatings,
      fiveStar: Math.ceil(totalRatings/2),
      fourStar: Math.ceil(totalRatings/4),
      threeStar: Math.ceil(totalRatings/8),
      twoStar: Math.ceil(totalRatings/16),
      oneStar: Math.ceil(totalRatings/32),
      downloadURL: "https://s3-us-west-2.amazonaws.com/genycrew.android.apps/Color+Switch_v2.6.9_apkpure.com.apk",
      category: categoryIds[categoryId],
      paid: isPaid
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
