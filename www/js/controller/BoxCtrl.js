app.controller("BoxCtrl", function($scope, $ionicPlatform, $cordovaSQLite, $cordovaNativeAudio, DatabaseService, $q) {
    $ionicPlatform.ready(function() { $scope.init() })

    $scope.init = function() {
        DatabaseService.init().then(function(e) {
            console.log(e);
            $scope.loadBox();
        });
    }

    $scope.loadBox = function() {
        console.log('BoxCtrl loadBox');
        if(window.cordova) {
            // objects
            $scope.collectionList = [];
            collectionList = [];
            // Select query
            var query = "SELECT * FROM sounds ORDER BY id ASC";
            $cordovaSQLite.execute(DatabaseService.getDatabase(),query).then(function(result) {
                if(result.rows.length > 0) {
                    console.log('LENGTH' + result.rows.length);
                    for(var i = 0; i < result.rows.length; i++) {
                        obj = {
                            'id': result.rows.item(i).id,
                            'soundName': result.rows.item(i).soundName
                        };
                        collectionList.push(obj);
                    }
                }
                else {
                    collectionList = [];
                }
                $scope.collectionList = collectionList;
                collectionList.forEach(function(e) {
                    console.log(e);
                    var soundPath = 'audio/' + e.id + '.m4a';

                    $cordovaNativeAudio
                        .preloadSimple(e.id, soundPath)
                        .then(function (msg) {
                            console.log('OK' + e.id);
                        }, function (error) {
                          console.log(error);
                        });

                })
            }, function(error) {
                console.log(error.message);
            });
            /*
            $scope.collectionList.forEach(function(e) {
                console.log("TEST" + e.id);
                var soundPath = 'audio/' + id + '.mp3';
                $cordovaNativeAudio
                    .preloadSimple(e.id, soundPath)
                    .then(function (msg) {
                        console.log('OK' + id);
                    }, function (error) {
                      console.log(error);
                    });
            });
            */
        }
    }

    $scope.play = function(id) {
        console.log('clicked:' + id);
        $cordovaNativeAudio.play(id);
    }

})
