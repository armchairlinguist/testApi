var express = require('express');
var router = express.Router();
var log = require('../libs/log')(module);

var User = require('../model/user');

router.get('/:id', function(req, res) {

	User.findById(req.params.id, function (err, user) {
		
		if(!user) {
			return res.status(404).end();
		}
		
		if (!err) {
			res.statusCode = 200;
			res.json({ 
				id: user._id,
				phone:user.phone,
				name: user.name,
				email: user.email
			});
		} else {
			res.statusCode = 500;
			log.error('Internal error(%d): %s',res.statusCode,err.message);
			
			return res.json({ 
				error: 'Server error' 
			});
		}
	});
});


module.exports = router;