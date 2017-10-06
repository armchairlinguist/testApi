var express = require('express');
var router = express.Router();
var log = require('../libs/log')(module);
var db = require('../db/mongoose');
var User = require('../model/user');

router.post('/', function(req, res) {
	log.info("message", req.headers);
	var user = new User({
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		password: req.body.password
	});

	user.save(function (err) {
		if (!err) {
			var token;
    		token = user.generateJwt();
			log.info("New user created with id: %s", colors.green(user.id));
			res.statusCode = 200;
			return res.json({ 
				token: token 
			});

		} else {
			if(err.name === 'ValidationError') {
				if(err.errors.name) {
					res.statusCode = 422;
					res.json({ 
						field: err.errors.name.path,
						message: 'User name should contain no less than 5 no more than 20 characters' 
					});
				} else if(err.errors.email) {
					res.statusCode = 422;
					res.json({ 
						field: err.errors.email.path,
						message: 'Not valid user email' 
					});
				} else if(err.errors.phone) {
					res.statusCode = 422;
					res.json({ 
						field: err.errors.phone.path,
						message: 'Not valid phone' 
					});
				} else {
					res.statusCode = 400;
					res.json({ 
						error: err.message 
					});
				}
				log.error('Internal error(%d): %s', res.statusCode, err.message);
				
			} else {
				if(User.find({"email": req.body.email})) {
					res.statusCode = 422;
					res.json({ 
						field: 'email',
						message: 'User with this email is already registered'
					});
					console.log("got email already");

				} else {
					res.statusCode = 500;
					res.json({ 
						error: 'Server error' 
					});
				}
				
			}
			log.error('Internal error(%d): %s', res.statusCode, err.message);
		}
	});
});


module.exports = router;