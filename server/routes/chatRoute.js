 
const ejs = require('ejs');
const appHelper = require('../helpers/appHelper');

module.exports = (apiRoutes, app) => {
	const http = require('http').createServer(app);
	const io = require('socket.io')(http);

	io.on('connection', function(socket){
		console.log('a user connected');
	});

	http.listen(3000, function(){
		console.log('listening on *:3000');
	});
};