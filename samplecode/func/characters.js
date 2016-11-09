/**
 * Created by Maravis on 5/16/2016.
 */

global.table_characters = {};

function queryCharacters() {

    global.mysql_connection.query( 'select * from Characters', function(err, rows){

        if(err)	{
            throw err;
        }else{
            global.table_characters = {};
            for (var i = 0; i < rows.length; i++) {
                global.table_characters[rows[i].id] = rows[i];
            }
        }

    });

}

global.sqlReloadCharacters = function() {
    queryCharacters();
};

global.sqlInsertNewCharacter = function(name, fortitude, reaction, will, composure, competencydice, pointtotal) {
    global.mysql_connection.query( 'select * from Characters', function(err, rows){

        if(err)	{
            throw err;
        }else{
            var highestID = 0;
            global.table_characters = {};
            for (var i = 0; i < rows.length; i++) {
                global.table_characters[rows[i].id] = rows[i];
                if (rows[i].id > highestID) {
                    highestID = rows[i].id;
                }
            }
            highestID++;
            var query = [
                "INSERT INTO `Characters` (`Name`, `Fortitude`, `Reaction`, `Will`, `Composure`, `Competency_dice`, `Point_Total`) VALUES ('",
                name,
                "', '",
                fortitude,
                "', '",
                reaction,
                "', '",
                will,
                "', '",
                composure,
                "', '",
                competencydice,
                "', '",
                pointtotal,
                "')"
            ];
            global.mysql_connection.query(query.join(""), function(err, row){
                queryCharacters();
            });
        }

    });
};

var queryInterval;

setTimeout(function(){
    queryCharacters();
    queryInterval = setInterval(queryCharacters, 1000 * 10);
}, 2070);