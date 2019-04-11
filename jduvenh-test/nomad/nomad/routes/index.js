var express = require('express');
var router = express.Router();

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

router.get('/:name/:id', function(req, res){
    res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
});

module.exports = router;
 