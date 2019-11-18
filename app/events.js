var events = {};

events.defineEvents = function(socket) {
	socket.on('Connected', function() {
		socket.emit('GetUsers');
		socket.emit('GetAvatars');
		socket.emit('GetMessages');
		if (helper.id && helper.users[helper.id]) {
			socket.emit('PostUser', helper.users[helper.id]);
		} else {
			socket.emit('GetUserId');
		}
	});

	socket.on('Set', function(data) {
		messages.print(null, data.messageToUser);
	});

	socket.on('UpdateUser', function(data) {
		helper.users[data.id] = data.user;
		if (data.id === helper.id) {
			messages.print(null, data.messageToUser);
		}
		messages.updateUser(data.id);
		messages.updateUserList();
	});

	socket.on('GetUserId', function(userId) {
		helper.id = userId;
	});

	socket.on('GetUsers', function(users) {
		helper.users = users;
		messages.updateUserList();
	});

	socket.on('DeleteUser', function(id) {
		delete helper.users[id];
		messages.updateUserList();
		messages.updateUser(id);
	});

	socket.on('GetAvatars', function(avatars) {
		helper.avatars = avatars;
	});

	socket.on('GetMessage', function(data) {
		messages.print(data.userId, data.message);
	});

	socket.on('GetMessages', function(messageList) {
		messages.fillMessages(messageList);
	});

	socket.on('ClearChat', function() {
		messages.clearChat();
	});
}

events.executeCommand = function(action, message, socket) {
	const params = message.substring(helper.actions[action].command.length + 1).split(' ');
	switch(action) {
		case 'set':

			// Expecting 2 parameter
			const helpStr = helper.getHelp(action, params, 2);
			console.log('helpStr');
			console.log(helpStr);
			if (helpStr) {
				messages.print(null, helpStr);
			} else {
				if(helper.users[helper.id][params[0]]) {
					socket.emit('Set', [params[0], params[1]]);
				} else{
					messages.print(null, 'You cannot set a value for ' + params[0]);
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
