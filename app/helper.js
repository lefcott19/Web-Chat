var helper = {};

// Return the prefix or false
helper.getAction = function(message, actions) {
	const names = Object.keys(actions);
	for (let k = 0; k < names.length; k++) {
		if (message.startsWith(actions[names[k]].command + ' ')) {
			return names[k];
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
		const values = Object.keys(helper.users[helper.id]);
		for(let k = 0; k < values.length; k++) {
			const currInfo = helper.users[helper.id][values[k]];
			const hasValues = currInfo instanceof Object;
			message += '| ' + values[k] + (currInfo.values ? ' -> Available values: ' + currInfo.values : ' -> Any value available');
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
	console.log('getHelp', action, params, length);
	return params.length == length && params.indexOf('') === -1 && params.indexOf('--help') === -1 ? false : helper.getDocs(action);
}

helper.getUserName = function(userId) {
	const id = userId || helper.id;
	return helper.users[id].name.base + (helper.users[id].name.count > 0 ? (' - ' + helper.users[id].name.count) : '');
}

helper.getAvatarSrc = function(userId) {
	return helper.avatars[helper.users[userId].avatar.value - 1];
}

helper.actions = {
	set: {
		command: '..set',
		help: '  | ..set --key-- --value--<br>  | You can set the following values:'
	}
};