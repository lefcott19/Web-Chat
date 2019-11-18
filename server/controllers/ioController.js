const auxHelper = require('../helpers/auxHelper');
const mathHelper = require('../helpers/mathHelper');

let users = {}, userCount = 0, messages = [];
const avatars = [
	'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png',
	'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/8_avatar-512.png',
	'https://cmkt-image-prd.freetls.fastly.net/0.1.0/ps/1382917/910/607/m1/fpnw/wm0/businessman-avatar-icon-01-.jpg?1466426985&s=9c232cc7dfe7b4e1f9252f29e16456e7'
], ignoredKeys = ['socket'];
const avatarValues = auxHelper.arrayOfNums(avatars.length, true);

function foundUser(name) {
	const ids = Object.keys(users);
	for (let k = 0; k < ids.length; k++) {
		if (users[ids[k]].name.base == name.base && users[ids[k]].name.count == name.count) {
			return true;
		}
	}
	return false;
}

function getUserName(name) {
	let count = 0;
	if (!foundUser(name)) {
		return name;
	}
	while (foundUser({ base: name.base, count: ++count})) {};
	return {
		base: name.base,
		count: count
	};
}
module.exports = {
	defineEvents: async io => {
		io.on('connection', function(socket) {
			socket.emit('Connected');

			console.log('a user connected');
		  socket.on('disconnect', function() {
		  	console.log('Delete ' + socket.id);
		  	io.emit('DeleteUser', socket.id);
		  	delete users[socket.id];
			});

		  socket.on('Set', function(data) {
		  	console.log('Recived data:');
		  	console.log(data);
		  	let allOk = true;
		  	switch (data[0]) {
		  		case 'name':
		  			const name = {
		  				base: data[1] || 'User',
		  				count: 0
		  			};
		  			users[socket.id].name = getUserName(name);
		  			break;
		  		case 'avatar':
		  			let result = {};
		  			if (!avatarValues.includes(data[1])) {
		  				result.avatar = null;
		  				result.error = 'Invalid avatar provided';
		  				allOk = false;
								socket.emit('Set', { error: 'Invalid avatar.' });
		  			} else {
		  				users[socket.id].avatar = data[1];
		  				result.avatar = data[1];
		  			};
		  			break;
		  	}
		  	if (allOk) {
					io.emit('UpdateUser', { user: auxHelper.excludeKeys(users[socket.id], ignoredKeys, false), id: socket.id });
		  	}
			});

			socket.on('GetUsers', function() {
				socket.emit('GetUsers', auxHelper.excludeKeys(users, ignoredKeys, true));
			});

			socket.on('GetUserId', function() {
				console.log('Emit GetUserId');
				const newUser = {
					name: getUserName({ base: 'User', count: 0 }),
					avatar: {
						value: mathHelper.getRandomItem(avatarValues),
						values: avatarValues
					},
					socket: socket
				};
				users[socket.id] = newUser;
		  	io.emit('UpdateUser', { user: auxHelper.excludeKeys(newUser, ignoredKeys, false), id: socket.id });
				socket.emit('GetUserId', socket.id);
			});

			// Sync Users connected after a server restart
			// Updates the user list
			socket.on('PostUser', function(user) {
				console.log('Post User:');
				console.log(user);
				const ids = Object.keys(users);
				for (let k = 0; k < ids.length; k++) {
					if (user.name.base == users[ids[k]].name.base && user.name.count == users[ids[k]].name.count) {
						users[ids[k]].name = getUserName(users[ids[k]].name);
			  		io.emit('UpdateUser', { user: auxHelper.excludeKeys(users[ids[k]], ignoredKeys, false), id: socket.id });
					}
				}
				user.socket = socket;
				users[socket.id] = user;
			  io.emit('UpdateUser', { user: auxHelper.excludeKeys(user, ignoredKeys, false), id: socket.id });
				socket.emit('GetUserId', socket.id);
				socket.emit('GetUsers', auxHelper.excludeKeys(users, ignoredKeys, true));
			});
		});
	}
};