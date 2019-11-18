var helper = {};

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

helper.getDocs = function(action) {
		if (!helper.id) {
			return ' | Waiting server connection...';
		}
		if (!helper.users[helper.id]) {
			return '  | Waiting user list...';
		}
		let message = helper.actions[action].help;
		const values = Object.keys(helper.user);
		for(let k = 0; k < values.length; k++) {
			const currInfo = helper.user[values[k]];
			const hasValues = currInfo instanceof Object;
			message += '\n    | ' + values[k] + (currInfo.values ? ' -> Available values: ' + currInfo.values : ' -> Any value available');
		}
		return message;
}
helper.parseFunctions = function(obj) {
	const objKeys = Object.keys(obj);
	let newObj = {};
	for (let k = 0; k < objKeys.length; k++) {
		if (objKeys[k].startsWith('function_')) {
			newObj[objKeys[k].substring('function_'.length)] = new Function(obj[objKeys[k]]);
		} else {
			newObj[objKeys[k]] =  obj[objKeys[k]];
		}
	}
	return newObj;
}
// False for valid command or help for invalid or help required
helper.getHelp = function(action, params, length) {
	return params.length == length && params.indexOf('') === -1 && params.indexOf('--help') === -1 ? false : helper.getDocs(action);
}

helper.print = function(message) {
	console.log('PRINT-------------------\n' + message);
}

helper.actions = {
	set: {
		command: '** set',
		help: `  | ** set <key> <value>
  | You can set the following values:`
	}
};