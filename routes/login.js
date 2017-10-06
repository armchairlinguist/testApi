var express = require('express');
var router = express.Router();
var log = require('../libs/log')(module);

var passport = require('passport');
var User = require('../model/user');

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    var token;
    if (err) {
      return next(err); // will generate a 500 error
    }
    if (! user) {
      res.statusCode = 422;
      return res.json({ 
         field: 'password',
          message: 'Wrong email or password' 
      });
    }
    token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
  })(req, res, next);

});


module.exports = router;