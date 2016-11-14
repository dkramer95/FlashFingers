var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;


// create a login form with username and password
// submit the form to a handler
// handler will look in mysql database for match
// if match found, enter login page
// else report error to the user