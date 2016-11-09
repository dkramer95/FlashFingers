/**
 * Created by Maravis on 5/16/2016.
 */

global.table_powers = {};

function queryPowers() {

    global.mysql_connection.query( 'select * from powers', function(err, rows){

        if(err)	{
            throw err;
        }else{
            global.table_powers = {};
            for (var i = 0; i < rows.length; i++) {
                global.table_powers[rows[i].id] = rows[i];
            }
        }

    });

}

var queryInterval;

setTimeout(function(){
    queryPowers();
    queryInterval = setInterval(queryPowers, 1000 * 10);
}, 2000);
