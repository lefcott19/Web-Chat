var messages = {};
messages.split = 18;
messages.currTop = messages.split;
messages.messageHeight = 60;
messages.imgSize = messages.messageHeight * 0.8;
messages.transition = '0.4s';

messages.print = function(userId, messageText, animate, customHeightCoef) {
	const messageHeight = (customHeightCoef || 1) * messages.messageHeight;
	let messageContainer = document.createElement('div');
	messageContainer.setAttribute('class', 'messageContainer');
	messageContainer.style.top = messages.currTop + 'px';
	messageContainer.style.height = messageHeight + 'px';
	let userName = 'Command line';
	const imgLeft = (messageHeight / 2) + 'px';
	const imgTop = imgLeft;
	let img = null;
	if (userId) {
		img = document.createElement('img');
		img.setAttribute('class', 'avatarImg img_' + userId);
		img.src = helper.getAvatarSrc(userId);
		img.width = messages.imgSize;
		img.height = messages.imgSize;
		img.style.left = imgLeft;
		img.style.top = imgTop;
		messageContainer.appendChild(img);

		let userName = document.createElement('div');
		if (userId == helper.id) {
			userName.style.cursor = 'pointer';
			userName.setAttribute('onclick', 'events.changeName()');
		}
		userName.setAttribute('class', 'userName name_' + userId);
		userName.style.left = messageHeight + 'px';
		userName.innerHTML = helper.getUserName(userId);
		let userNameStr = helper.getUserName(userId);

		if (!userNameStr) {
			userName.innerHTML = 'disconnected';
			userName.style.textDecoration = 'line-through';
			messageContainer.style.opacity = 0.6;
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
	messages.currTop += messageHeight + messages.split;
	container.scroll(0, container.scrollTopMax);

	if (animate) {
		messageContainer.style.left = '150%';
		messageContainer.style.opacity = 0.3;
		if (img) {
			img.style.left = '100%';
			img.style.top = '-100%';
			img.style.width = (messages.imgSize * 5) + 'px';
			img.style.height = (messages.imgSize * 5) + 'px';
			img.style.opacity = 0.3;
		}
		setTimeout(function() {
			messageContainer.style.transition = messages.transition;
			messageContainer.style.left = '50%';
			messageContainer.style.opacity = 1;
			if (img) {
				img.style.transition = messages.transition;
				img.style.left = imgLeft;
				img.style.top = imgLeft;
				img.style.width = messages.imgSize + 'px';
				img.style.height = messages.imgSize + 'px';
				img.style.opacity = 1;
			}
		}, 10);
	}
}

messages.fillMessages = function(messageList) {
	for (let k = 0; k < messageList.length; k++) {
		messages.print(messageList[k].userId, messageList[k].message, false, 1);
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
			names[k].parentElement.style.opacity = 0.6;
		} else {
			names[k].innerHTML = userName;
		}
	}
}

messages.updateUserList = function() {
	userList.innerHTML = '';
	const ids = Object.keys(helper.users);
	for (let k = 0; k < ids.length; k++) {
		let newUser = null;
		if (ids[k] == helper.id) {
			newUser = '<div class = \'userName\' style = \'position: relative; cursor: pointer; text-shadow: 5px 5px 5px; font-size: 18px;\' onclick = \'events.changeName()\'>' + helper.getUserName(ids[k]) + '</div>';
		} else {
			newUser = '<div class = \'userName\' style = \'position: relative; color: #123;\'>' + helper.getUserName(ids[k]) + '</div>';
		}
		userList.innerHTML += newUser + '<br>';
	}
}

messages.clearChat = function() {
	messages.currTop = 0;
	container.innerHTML = '';
}