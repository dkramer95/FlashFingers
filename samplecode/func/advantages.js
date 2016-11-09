/**
 * Created by Maravis on 5/16/2016.
 */

global.table_advantages = {};

function queryAdvantages() {

    global.mysql_connection.query( 'select * from advantages', function(err, rows){

        if(err)	{
            throw err;
        }else{
            global.table_advantages = {};
            for (var i = 0; i < rows.length; i++) {
                global.table_advantages[rows[i].id] = rows[i];
            }
        }

    });

}

var queryInterval;

setTimeout(function(){
    queryAdvantages();
    queryInterval = setInterval(queryAdvantages, 1000 * 10);
}, 2020);
