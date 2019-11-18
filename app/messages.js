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
	let userName = null;
	if (userId) {

		let img = document.createElement('img');
		img.setAttribute('class', 'avatarImg');
		img.src = helper.avatars[helper.users[userId].avatar.value - 1];
		img.width = messages.imgSize;
		img.height = messages.imgSize;
		img.style.left = (messages.messageHeight / 2) + 'px';
		img.style.top = (messages.messageHeight / 2) + 'px';
		messageContainer.appendChild(img);
	}
	let message = document.createElement('div');
	message.setAttribute('class', 'message');
	message.innerHTML = messageText;
	messageContainer.appendChild(message);
	container.appendChild(messageContainer);
	messages.currTop += messages.messageHeight + messages.split;
}