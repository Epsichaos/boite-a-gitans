//db singleton factory
angular.module('db.service', ['ngCordova'])
    .factory('DatabaseService', function($cordovaSQLite, $q) {
        // init db
        var db = null;

        var getDatabase = function() {
            return db;
        }

        /* init function*/
        var init = function() {
            console.log('init');
            // promise for init
            var deferred = $q.defer();
            db = $cordovaSQLite.openDB({name:'dev.box.gitans.db', location:'default'});
            //$cordovaSQLite.execute(db, "DROP TABLE sounds");
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS sounds (id integer primary key, soundName text)");
            var countQuery = "SELECT * FROM sounds";
            $cordovaSQLite.execute(db,countQuery).then(function(result) {
                if(result.rows.length !== 31) {
                    console.log('launch generateAllDatabase');
                    generateAllDatabase().then(function(e) {
                        if(e === 'success') {
                            deferred.resolve('success');
                        }
                        else {
                            deferred.reject();
                        }
                    });
                }
                else {

                    deferred.resolve('success');
                }
            });
            return deferred.promise;
        }

        var generateAllDatabase = function() {
            var deferred = $q.defer();
            console.log('generateAllDatabase');
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
            ]
            var query = "INSERT INTO sounds (id, soundName) VALUES (?,?)";
            queries.forEach(function(queryContent) {
                $cordovaSQLite.execute(db,query,[queryContent.id,queryContent.soundName]).then(function(result) {
                    //alert("INSERT ID -> " + result.insertId);
                    console.log(result.insertId);
                    if(result.insertId === 31) {
                        deferred.resolve('success');
                    }
                }, function(error) {
                    // alert(error);
                    deferred.resolve('error');
                    console.log('failure in inserting data' + error.message)
                });
            });
            return deferred.promise;
        }

        return {
            init: init,
            generateAllDatabase: generateAllDatabase,
            getDatabase: getDatabase
        };
    })
