/**
 * Created by Maravis on 5/16/2016.
 */

global.table_boosts = {};

function queryBoosts() {

    global.mysql_connection.query( 'select * from boosts', function(err, rows){

        if(err)	{
            throw err;
        }else{
            global.table_boosts = {};
            for (var i = 0; i < rows.length; i++) {
                global.table_boosts[rows[i].id] = rows[i];
            }
        }

    });

}

var queryInterval;

setTimeout(function(){
    queryBoosts();
    queryInterval = setInterval(queryBoosts, 1000 * 10);
}, 2050);
