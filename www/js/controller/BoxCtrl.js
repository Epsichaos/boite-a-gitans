app.controller("BoxCtrl", function($scope, $cordovaSQLite, $ionicPopup) {
    $scope.init = function() {
        $scope.play();
    }
    $scope.play = function(id) {
        console.log("clicked " + id);
        if(window.cordova) {
            // objects
            $scope.collectionList = [];
            collectionList = [];
            // load/create database
            //dbApp = $cordovaSQLite.openDB({name:'dev.box.gitans.db', location:'default'});
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
})
