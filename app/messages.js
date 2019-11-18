var messages = {};
messages.currTop = 0;
messages.split = 15;
messages.messageHeight = 60;
messages.imgSize = messages.messageHeight * 0.8;

messages.print = function(userId, messageText) {
	let messageContainer = document.createElement('div');
	messageContainer.setAttribute('class', 'messageContainer');
	messageContainer.style.top = messages.currTop + 'px';
	messageContainer.style.height = messages.messageHeight + 'px';
	let userName = 'Command line';
	if (userId) {
		let img = document.createElement('img');
		img.setAttribute('class', 'avatarImg img_' + userId);
		img.src = helper.getAvatarSrc(userId);
		img.width = messages.imgSize;
		img.height = messages.imgSize;
		img.style.left = (messages.messageHeight / 2) + 'px';
		img.style.top = (messages.messageHeight / 2) + 'px';
		messageContainer.appendChild(img);

		let userName = document.createElement('div');
		userName.setAttribute('class', 'userName name_' + userId);
		userName.style.left = messages.messageHeight + 'px';
		userName.innerHTML = helper.getUserName(userId);
		let userNameStr = helper.getUserName(userId);

		if (!userNameStr) {
			userName.innerHTML = 'disconnected';
			userName.style.textDecoration = 'line-through';
		} else {
			userName.innerHTML = userNameStr;
		}
		messageContainer.appendChild(userName);
	}
	let message = document.createElement('div');
	message.setAttribute('class', 'message');
	message.innerHTML = messageText;
	messageContainer.appendChild(message);
	container.appendChild(messageContainer);
	messages.currTop += messages.messageHeight + messages.split;
}

messages.fillMessages = function(messageList) {
	for (let k = 0; k < messageList.length; k++) {
		messages.print(messageList[k].userId, messageList[k].message);
	}
}

messages.updateUser = function(userId) {
	let imgs = document.getElementsByClassName('img_' + userId)
	for (let k = 0; k < imgs.length; k++) {
		imgs[k].src = helper.getAvatarSrc(userId);
	}

	let userName = helper.getUserName(userId);
	let names = document.getElementsByClassName('name_' + userId)
	for (let k = 0; k < names.length; k++) {
		if (!userName) {
			names[k].innerHTML = 'disconnected';
			names[k].style.textDecoration = 'line-through';
			names[k].style.opacity = 0.6;
		} else {
			names[k].innerHTML = userName;
		}
	}
}

messages.updateUserList = function() {
	userList.innerHTML = '';
	const ids = Object.keys(helper.users);
	for (let k = 0; k < ids.length; k++) {
		userList.innerHTML += helper.getUserName(ids[k]) + '<br>';
	}
}

messages.clearChat = function() {
	messages.currTop = 0;
	container.innerHTML = '';
}