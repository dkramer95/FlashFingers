/**
 * Created by Maravis on 5/16/2016.
 */

global.table_disadvantages = {};

function queryDisadvantages() {

    global.mysql_connection.query( 'select * from disadvantages', function(err, rows){

        if(err)	{
            throw err;
        }else{
            global.table_disadvantages = {};
            for (var i = 0; i < rows.length; i++) {
                global.table_disadvantages[rows[i].id] = rows[i];
            }
        }

    });

}

var queryInterval;

setTimeout(function(){
    queryDisadvantages();
    queryInterval = setInterval(queryDisadvantages, 1000 * 10);
}, 2030);
