var messages = {};
messages.currTop = 0;
messages.split = 15;
messages.messageHeight = 60;
messages.imgSize = messages.messageHeight * 0.8;

messages.print = function(userId, messageText) {
	console.log('print');
	console.log(userId, messageText);
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

	let names = document.getElementsByClassName('name_' + userId)
	for (let k = 0; k < names.length; k++) {
		names[k].innerHTML = helper.getUserName(userId);
	}
}

messages.clearChat = function() {
	messages.currTop = 0;
	container.innerHTML = '';
}