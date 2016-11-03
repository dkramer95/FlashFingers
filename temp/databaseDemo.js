var http = require('http');
var mysql = require('mysql');

// database connection settings
 var connection = mysql.createConnection({
   host     : 'mysql.hlaingfahim.com',
   user     : 'neumont',
   password : 'sugarc0deit',
   database : 'donutsprinkles'
 });

// try to connect
 connection.connect(function (err) {
     if (err) {
         console.log("Error: " + err.message);
         throw err;
     } else {
         console.log("Connection successful!");
     }
 });

var users = "";

// perform sample query
connection.query('SELECT * from Users', function(err, rows, fields) {
   if (!err) {
       console.log("Users in the database...");
       for (var j in rows) {
           console.log("User: " + rows[j].Username);
           var user = rows[j].Username;
           users += user + ", ";
       }
   } else {
       console.log("Error while performing query!");
   }
});

// create server and echo data to the screen
var server = http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end("Users in the database: " + users);
})

server.listen(8000);

connection.end(function() {
    console.log("Connection closed");
});
