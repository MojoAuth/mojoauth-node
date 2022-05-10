var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'NodeJS MojoAuth Demo', 
    subtitle: 'This is a Email magic link authentication demo', 
    baseurl: 'http://localhost:3000/'
  });
});

module.exports = router;
