var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	var query = req.query;
	res.render('printcomp', {
		title: 'Supers! Character Generator',
		char1: global.table_characters[query.char1],
		char2: global.table_characters[query.char2]
	});
});

router.post('/', function (req, res, next) {
	res.redirect('/');
});

module.exports = router;