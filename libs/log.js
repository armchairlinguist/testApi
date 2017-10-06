var winston = require('winston');
require('winston-papertrail').Papertrail;

function getLogger(module) {
  var path = module.filename.split('/').slice(-2).join('/');

  return new winston.Logger({
	transports: [
		new winston.transports.Console({
			json: true,
			stringify: true,
			label: path
		}),
		new winston.transports.Papertrail({
			host: 'logsN.papertrailapp.com',
			port: XXXXX,
		    hostname: process.env.DEPLOYMENT_ENV,
			program: "testApi",
		    handleExceptions: false,
		    json: true,
		    colorize: false,
		    logFormat(level, message) {
		      return `${level} : ${message}`;
		    }
		})
	],
	expressFormat: false,
	level: "debug",
	});
}

module.exports = getLogger;