// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ngCordova'])

app.run(function($rootScope, $ionicPlatform, $cordovaSQLite, $ionicPopup) {
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
            //$cordovaSQLite.execute(dbApp, "DROP TABLE sounds");
            $cordovaSQLite.execute(dbApp, "CREATE TABLE IF NOT EXISTS sounds (id integer primary key, soundName text)");

            var queries = [
                    {id: 1, soundName: "Je m'appelle Lopez, Joe"},
                    {id: 2, soundName: "Je suis obligé de faire ça..."},
                    {id: 3, soundName: "Qui a pris une volée !"},
                    {id: 4, soundName: "Et Hoffman de tes morts !"},
                    {id: 5, soundName: "Je vais vous enculer vos morts"},
                    {id: 6, soundName: "Tu viens quand tu veux"},
                    {id: 7, soundName: "Il a fallu que je vienne..."},
                    {id: 8, soundName: "Tu vois ce que tu me forces à faire"},
                    {id: 9, soundName: "Moi je viens tout seul "},
                    {id: 10, soundName: "Viens on va en finir"},
                    {id: 11, soundName: "Moitié route, sur mon défunt père"},
                    {id: 12, soundName: "Et celui qui vient pas ..."},
                    {id: 13, soundName: "On se donne rendez-vous !"},
                    {id: 14, soundName: "Je veux en finir"},
                    {id: 15, soundName: "J'ai jamais pris une volée"},
                    {id: 16, soundName: "J'en veux Joe !"},
                    {id: 17, soundName: "De toute façon on est en 2012"},
                    {id: 18, soundName: "Vous allez payer"},
                    {id: 19, soundName: "Le sang de vos morts"},
                    {id: 20, soundName: "La calotte de vos morts"},
                    {id: 21, soundName: "Viens là toi !"},
                    {id: 22, soundName: " La calotte de ses morts"},
                    {id: 23, soundName: "Le sang de leurs morts il mangera"},
                    {id: 24, soundName: "Ta femme ..."},
                    {id: 25, soundName: "Ferme ta gueule"},
                    {id: 26, soundName: "J'ai pas peur moi"},
                    {id: 27, soundName: "C'est pas deux coups de poings"},
                    {id: 28, soundName: "Mon petit frère qui est là"},
                    {id: 29, soundName: "C'est la castagne"},
                    {id: 30, soundName: "????"},
                    {id: 31, soundName: "J'fais 75 kilos j'fais"}
            ];
            var query = "INSERT INTO sounds (id, soundName) VALUES (?,?)";
            queries.forEach(function(queryContent) {
                $cordovaSQLite.execute(dbApp,query,[queryContent.id,queryContent.soundName]).then(function(result) {
                    //alert("INSERT ID -> " + result.insertId);
                    console.log(result.insertId);
                }, function(error) {
                    // alert(error);
                    console.log('failure in inserting data' + error.message)
                });
            });
/*
            var query = "INSERT INTO sounds (id, soundName) VALUES (?,?)";
            $cordovaSQLite.execute(dbApp,query,["1","Je m'appelle Lopez, Joe"]).then(function(result) {
                //alert("INSERT ID -> " + result.insertId);
                console.log(result.insertId);
            }, function(error) {
                // alert(error);
                console.log('failure in inserting data' + error.message)
            });
*/
            $rootScope.$emit("loadBox", {});
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
