module.exports = {
	// Example: 4 ---> [1, 2, 3, 4]
	arrayOfNums: (max, toString) => {
		let arr = [], sum = max > 0 ? 1 : -1;
		for (let k = sum; k <= max; k += sum) {
			arr.push(toString ? k.toString() : k);
		}
		return arr;
	},
	// Recives either:
	// Object, Array of Objects, Object of Objects
	excludeKeys(objs, exclude, separateByKey) {
		if (separateByKey) {
			const objKeys = Object.keys(objs);
			let parsedObjs = {};
			for (let k = 0; k < objKeys.length; k++) {
				parsedObjs[objKeys[k]] = this.excludeKeys(objs[objKeys[k]], exclude, false);
			}
			return parsedObjs
		}
		objs = Array.isArray(objs) ? objs : [objs];
		let parsedObjs = [];
		for (let a = 0; a < objs.length; a++) {
			const objKeys = Object.keys(objs[a]);
			parsedObjs[a] = {};
			for (let k = 0; k < objKeys.length; k++) {
				if (!exclude.includes(objKeys[k])) {
					parsedObjs[a][objKeys[k]] = objs[a][objKeys[k]];
				}
			}
		}
		return objs.length >= 2 ? parsedObjs : parsedObjs[0];
	}
}