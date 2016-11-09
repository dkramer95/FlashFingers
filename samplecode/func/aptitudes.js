/**
 * Created by Maravis on 5/16/2016.
 */

global.table_aptitudes = {};

function queryAptitudes() {

    global.mysql_connection.query( 'select * from aptitudes', function(err, rows){

        if(err)	{
            throw err;
        }else{
            global.table_aptitudes = {};
            for (var i = 0; i < rows.length; i++) {
                global.table_aptitudes[rows[i].id] = rows[i];
            }
        }

    });

}

var queryInterval;

setTimeout(function(){
    queryAptitudes();
    queryInterval = setInterval(queryAptitudes, 1000 * 10);
}, 2040);
