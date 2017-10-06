var express = require('express');
var router = express.Router();
var log = require('../libs/log')(module);

var User = require('../model/user');

router.get('/', function(req, res) {
	if (!req.payload._id) {
	    return res.status(401).end();
	  } else {
	    User.findById(req.payload._id, function(err, user) {
	        if(err) {
	        	res.statusCode = 500;
				log.error('Internal error(%d): %s',res.statusCode,err.message);
				return res.json({ 
					error: 'Server error' 
				});
	        }
	        if(!user) {
	        	return res.status(404).json({message: 'User not found'});
	        }
	        res.statusCode = 200;
			res.json({ 
				id: user._id,
				phone:user.phone,
				name: user.name,
				email: user.email
			});
	      });
	  }
});

router.put('/', function(req, res) {
		if(!req.payload._id) {
	    return res.status(401).end();
	  } else {
	  	User.findById(req.payload._id, function(err, user) {
	        if(err) {
	        	res.statusCode = 500;
				log.error('Internal error(%d): %s',res.statusCode,err.message);
				return res.json({ 
					error: 'Server error' 
				});
	        }
	        if(!user) {
	        	return res.status(404).json({message: 'User not found'});
	        }
	         if(req.body.name) user.name = req.body.name;
	         if(req.body.phone) user.phone = req.body.phone;
	         if(req.body.email) user.email = req.body.email;
	         if(req.body.current_password&&!req.body.new_password) {
	         	res.statusCode = 422;
	         	return res.json({
	         		field: 'new_password',
	         		message: 'New password is required'
	         	}); 
	         }
	         if(req.body.current_password&&req.body.new_password) {
	         	user.password = req.body.new_password;
	         }
	         user.save(function(err) {
	         	if (!err) {
					log.info("User with id " + user._id + " updated");
					return res.json({ 
						user:user 
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
								message: 'User with this email is arleady registered' 
							});

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
	  }
});


module.exports = router;