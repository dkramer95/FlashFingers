var express = require('express');
var router = express.Router();

/* GET random character. */
router.get('/', function (req, res, next) {
	res.render('random', {
		title: 'Supers! Character Generator',

	});
});

module.exports = router;