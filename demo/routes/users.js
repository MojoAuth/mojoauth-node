var express = require('express');
var router = express.Router();
var jwt_decode = require('jwt-decode')

 


var config = {
  apiKey: 'API_KEY',
};

var ma = require('mojoauth-sdk')(config);

/* GET users listing. */
router.get('/myaccount', function(req, res, next) {
  if (!req.session.user || !req.session.user.token) {
      return res.redirect("/");
  }

  var token = req.session.user.token
  var decoded = jwt_decode(token);

  console.log(decoded)
  /*
  {
    identifier: 'your@email.com',
    auth_type: 'magiclink',
    token_type: 'access_token',
    aud: '251kd11d-463e-4e11-9199-8687455a045a',
    exp: 1656109205,
    jti: '53a0ae75-7e87-4faf-bfb4-923b9fd847fb',
    iat: 1652169005,
    iss: 'https://www.mojoauth.com',
    nbf: 1652169005
  }
  */

  res.render('myaccount', { title: 'User Account', subtitle: 'You are successfully logged-In', email: decoded.identifier });
});


/* User Verify Token */
router.post('/verify', function(req, res, next) {
  
  var jwtToken = req.body.token;
  console.log(jwtToken)

  ma.mojoAPI.verifyToken(jwtToken).then(function (response) {
    
    var userObj = {};
    userObj.token = jwtToken;
    req.session.regenerate(function () {
      req.session.user = userObj;
      res.json(response)
    })
  }).catch(function (error) {
    res.status(404).json(error);
  });
});


/* User Verify Token */
router.get('/verify', function(req, res, next) {
  
  var state_id = req.query.state_id;
  console.log(state_id)

  ma.mojoAPI.pingStaus(state_id).then(function (response) {
    if(response.authenticated) {
      var userObj = {};
      userObj.token = response.oauth.access_token;
      req.session.regenerate(function () {
        req.session.user = userObj;
        return res.redirect("/users/myaccount");
      })
    } else {
      return res.redirect("/");
    }
  }).catch(function (error) {
    res.status(404).json(error);
  });
});



/* User Logout */
router.get('/logout', function(req, res, next) {
  //console.log('logout function is called value:', req.session)
  if (req.session.user) {
    req.session.user.destroy; // Deletes the session in the database.
    req.session.user = null; // Deletes the cookie.
  }

  return res.redirect("/");
});
module.exports = router;
