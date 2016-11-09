/**
 * Created by Maravis on 5/16/2016.
 */

global.table_complications = {};

function queryComplications() {

    global.mysql_connection.query( 'select * from Complications', function(err, rows){

        if(err)	{
            throw err;
        }else{
            global.table_complications = {};
            for (var i = 0; i < rows.length; i++) {
                global.table_complications[rows[i].id] = rows[i];
            }
        }

    });

}

var queryInterval;

setTimeout(function(){
    queryComplications();
    queryInterval = setInterval(queryComplications, 1000 * 10);
}, 2060);
