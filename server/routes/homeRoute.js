 
const ejs = require('ejs');
const appHelper = require('../helpers/appHelper');
const ioController = require('../controllers/ioController');

module.exports = (apiRoutes, io, rootPath) => {

	apiRoutes.get('/', function(req, res) {
		res.sendFile(rootPath + '/app/index.html');
	});

	apiRoutes.get('/helper.js', function(req, res) {
		res.sendFile(rootPath + '/app/helper.js');
	});

	apiRoutes.get('/events.js', function(req, res) {
		res.sendFile(rootPath + '/app/events.js');
	});

	apiRoutes.get('/messages.js', function(req, res) {
		res.sendFile(rootPath + '/app/messages.js');
	});

	ioController.defineEvents(io);
};