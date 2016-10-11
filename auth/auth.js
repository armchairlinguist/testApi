var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var db = require('../db/mongoose');
var User = require('../model/user');


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user || !user.checkPassword(password)) {
        return done(null, false, 'Wrong email or password');
      }
      // If credentials are correct, return the user object
      return done(null, user);
    });
  }
));
