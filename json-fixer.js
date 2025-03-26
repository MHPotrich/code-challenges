function fixJson(wrongJson){
	let fixedJson = new Object();
	const regexStringValue = /"\w+":"\w+"/g;
	const regexObjectValue = /"\w+":{.+}/g;

	wrongJson = wrongJson.replace(/\s/g, "");

	const objects = wrongJson.match(regexObjectValue);
	const strings = wrongJson.match(regexStringValue);

	if(objects !== null){
		objects.forEach(object => {
			object = `{${object}}`;
			fixedJson = Object.assign(fixedJson, JSON.parse(object));
		});
	}
	
	if(strings !== null){
		strings.forEach(string => {
			string = `{${string}}`;
			fixedJson = Object.assign(fixedJson, JSON.parse(string));
		});
	}

	return JSON.stringify(fixedJson);
}

console.log("Test 1:", fixJson('{"ndh": { "sdjfh": "dkfj", "dkjfsh": "dfjkshj" }, "ddl'));
