module.exports = {
	getRandomItem: function(arr) {
		return arr[Math.ceil(Math.random() * arr.length - 1)];
	}
}