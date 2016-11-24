// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ngCordova'])
var dbApp = null;

app.run(function($ionicPlatform, $cordovaSQLite, $ionicPopup) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
      // load/create database
      dbApp = $cordovaSQLite.openDB({name:'dev.box.gitans.db', location:'default'});
      $cordovaSQLite.execute(dbApp, "CREATE TABLE IF NOT EXISTS sounds (id integer primary key, soundName text)");
      var query = "INSERT INTO sounds (id, soundName) VALUES (?,?)";
      $cordovaSQLite.execute(dbApp,query,["1","Je m'appelle Lopez, Joe"]).then(function(result) {
          alert("INSERT ID -> " + result.insertId);
      }, function(error) {
          alert(error);
      });
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('box', {
            url:'/box',
            templateUrl:'partials/box.html',
            controller:'BoxCtrl'
        })
        .state('about', {
            url:'/about',
            templateUrl:'partials/about.html'
        })
    $urlRouterProvider.otherwise('box');
})
