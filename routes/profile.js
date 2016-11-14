var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    //if (req.session != null) {
    //    res.send("Welcome, " + req.session.user);
    //} else {
    //    res.send("You don't have permission to view this page!");
    //}
});

module.exports = router;