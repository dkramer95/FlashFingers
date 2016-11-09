var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('create', {
    title: 'Supers! Character Generator',
    ptable: global.table_powers,
    atable: global.table_aptitudes,
    advtable: global.table_advantages,
    dtable: global.table_disadvantages,
    btable: global.table_boosts,
    ctable: global.table_complications
  });
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  var totalpoints = (req.body.fortitude + req.body.reaction + req.body.will + req.body.composure);
  global.sqlInsertNewCharacter(req.body.charactername, req.body.fortitude, req.body.reaction, req.body.will, req.body.composure, 0, totalpoints);
  res.redirect('/');
});

module.exports = router;

