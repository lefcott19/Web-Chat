var events = {};

events.defineEvents = function(socket) {
	socket.on('Connected', function() {
		socket.emit('GetUsers');
		if (helper.id && helper.users[helper.id]) {
			console.log('emit PostUser');
			socket.emit('PostUser', helper.users[helper.id]);
		} else {
			socket.emit('GetUserId');
		}
	});

	socket.on('Set', function(data) {
		helper.print(data.error);
	});

	socket.on('UpdateUser', function(data) {
		helper.users[data.id] = data.user;
		console.log('Updated user, data:');
		console.log(data);
		// TODO Visual update
	});

	socket.on('GetUserId', function(userId) {
		console.log('Got ID: ' + userId);
		helper.id = userId;
		// TODO Visual update
	});

	socket.on('GetUsers', function(users) {
		console.log('Got users');
		console.log(users);
		helper.users = users;
		// TODO Visual update
	});

	socket.on('DeleteUser', function(id) {
		delete helper.users[id];
		// TODO Visual update
	});
}

events.executeCommand = function(action, message, socket) {
	const params = message.substring(action.length + 1).split(' ');
	switch(action) {
		case helper.actions.set.command:

			// Expecting 2 parameter
			const helpStr = helper.getHelp(action, params, 2);
			if (helpStr) {
				helper.print(helpStr);
			} else {
				if(helper.users[helper.id][params[0]]) {
					socket.emit('Set', [params[0], params[1]]);
				} else{
					helper.print('You cannot set a value for ' + params[0]);
				}
			}
			break;
	}
}

events.sendMessage = function(message) {
	const action = helper.getAction(message, helper.actions);
	if (action) {
		events.executeCommand(action, message, socket);
	} else {
		socket.emit('SendMessage', message);
	}
}
