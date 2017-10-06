var express         = require('express');
var path            = require('path'); 
var log             = require('./libs/log')(module);
var colors          = require('colors/safe');
var config = require('./config');
require('./auth/auth');

var register = require('./routes/register');
var login = require('./routes/login');
var me = require('./routes/me');
var user = require('./routes/user');

var bodyParser = require('body-parser');
var passport = require('passport');
var methodOverride = require('method-override');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(passport.initialize());

var jwt = require('express-jwt');
var secret = process.env.JWT_SECRET || "MY_SECRET"; // super secret
var auth = jwt({
  secret: secret,
  userProperty: 'payload'
});

app.use('/api/register', register);
app.use('/api/login', login);
app.use('/api/me', auth, me);
app.use('/api/user', auth, user);

app.get('/api', function (req, res) {
    res.send('API is running');
});

app.use(function(err, req, res, next){
    log.info('Not found URL: %s',req.url);
	log.info(req.headers,res.body);
    res.status(404).end(); //send empty body
    return;
});
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    log.error(err);
	log.info(req.headers,res.body);
    res.status(401).end(); //send empty body
    return;
  }
});
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error('Internal error(%d): %s',res.statusCode,err.message , err);
	log.info(req.headers,res.body);
    res.send({ error: err.message });
    return;
});


app.listen(config.get('port'), function(){
    log.info('Express server listening on ' + colors.red('port') + ' ' + config.get('port'));
});

module.exports = app;