let helper = {};

helper.arrayOfNums = function(max) {
	let arr = [], sum = max > 0 ? 1 : -1;
	for (let k = sum; k <= max; k += sum) {
		arr.push(k);
	}
	return arr;
}

// Return the prefix or false
helper.getAction = function(message, actions) {
	const names = Object.keys(actions);
	for (let k = 0; k < names.length; k++) {
		if (message.startsWith(actions[names[k]].command + ' ')) {
			return actions[names[k]].command;
		}
	}
	return false;
}

helper.getDocs = function() {
	if (helper.userInfo.length == 0) {
		return 'You can\'t do anything with this command';
	} else {
		let message = helper.actions.set.help;
		const values = Object.keys(helper.userInfo);
		for(let k = 0; k < values.length; k++) {
			const currInfo = helper.userInfo[values[k]];
			const hasValues = currInfo instanceof Object;
			message += '\n    | ' + values[k] + (currInfo.values ? ' -> Available values: ' + currInfo.values : ' -> Any value available');
		}
		return message;
	}
}

// False for valid command or help for invalid or help required
helper.getHelp = function(params, length) {
	return params.length == length && params.indexOf('') === -1 && params.indexOf('--help') === -1 ? false : helper.getDocs();
}

helper.executeCommand = function(action, message, socket) {
	const params = message.substring(action.length + 1).split(' ');
	switch(action) {
		case helper.actions.set.command:

			// Expecting 2 parameter
			const helpStr = helper.getHelp(params, 2);
			if (helpStr) {
				helper.print(helpStr);
			} else{
				if(helper.userInfo[params[0]]) {
					socket.emit('set', {
						[params[0]]: params[1]
					});
				} else{
					helper.print('You cannot set a value for ' + params[0]);
				}
			}
			break;
	}
}

helper.print = function(message) {
	console.log('PRINT-------------------\n' + message);
}

helper.avatars = [
	'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png',
	'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/8_avatar-512.png',
	'https://cmkt-image-prd.freetls.fastly.net/0.1.0/ps/1382917/910/607/m1/fpnw/wm0/businessman-avatar-icon-01-.jpg?1466426985&s=9c232cc7dfe7b4e1f9252f29e16456e7'
];
helper.userInfo = {
	name: 'NewUser',
	avatar: {
		value: 1,
		values: helper.arrayOfNums(helper.avatars.length)
	}
}
helper.actions = {
	set: {
		command: '__set',
		help: `  | __set <key> <value>
  | You can set the following values:`
	}
};