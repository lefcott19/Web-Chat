 
const ejs = require('ejs');
const appHelper = require('../helpers/appHelper');

module.exports = (apiRoutes, app, port, rootPath) => {
	const http = require('http').createServer(app);
	const io = require('socket.io')(http);
	app.get('/', function(req, res) {
	  res.sendFile(rootPath + '/app/index.html');
	});

	app.get('/helper.js', function(req, res) {
	  res.sendFile(rootPath + '/app/helper.js');
	});

	io.on('connection', function(socket){
		console.log('a user connected');
	  socket.on('disconnect', function(){
			console.log('user disconnected');
		});
	  socket.on('set', function(data) {
			console.log('Set :' + JSON.stringify(data));
		});
	});

	http.listen(port, function() {
		console.log('listening on ' + port);
	});
};