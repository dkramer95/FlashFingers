//var mysql = require('mysql');

// database connection
//var connection = mysql.createConnection({
//  host : 'mysql.hlaingfahim.com',
//  user : 'neumont',
//  password : 'sugarc0deit',
//  database : 'donutsprinkles'
//});


var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render("login", { username: "", password: "" });
});

module.exports = router;
