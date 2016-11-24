app.controller("BoxCtrl", function($scope, $rootScope, $cordovaSQLite, $cordovaNativeAudio) {
    $rootScope.$on('loadBox', function() {
        $scope.loadBox();
    });

    $scope.init = function() {
        $scope.loadBox();
    }

    $scope.loadBox = function() {
        console.log('BoxCtrl loadBox');
        if(window.cordova) {
            // objects
            $scope.collectionList = [];
            collectionList = [];
            // load/create database
            dbApp = $cordovaSQLite.openDB({name:'dev.box.gitans.db', location:'default'});
            var query = "SELECT * FROM sounds ORDER BY id ASC";
            $cordovaSQLite.execute(dbApp,query).then(function(result) {
                if(result.rows.length > 0) {
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
            }, function(error) {
                //alert('error' + error);
            });
        }
    }

    $scope.play = function(id) {
        // logging
        console.log("clicked " + id);
        var soundPath = 'audio/' + id + '.mp3';

        // stop previous played song
        $cordovaNativeAudio.stop('click');
        // launch new sound
        $cordovaNativeAudio
            .preloadSimple('click', soundPath)
            .then(function (msg) {
                $cordovaNativeAudio.play('click');
            }, function (error) {
              console.log(error);
            });
    }
})
