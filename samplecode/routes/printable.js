var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	var id = Number(req.query.id);
	res.render('printable', {
		title: 'Supers! Character Generator',
		character: global.table_characters[id]
	});
});

router.post('/', function (req, res, next) {
	res.redirect('/');
});

module.exports = router;