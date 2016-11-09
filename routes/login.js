var express = require('express');
var router = express.Router();
var mysql = require('mysql');

module.exports = router;


// database connection
var connection = mysql.createConnection({
  host : 'mysql.hlaingfahim.com',
  user : 'neumont',
  password : 'sugarc0deit',
  database : 'donutsprinkles'
});

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login'});
});


