function fixJson(wrongJson){
	let fixedJson = new Object();
	const regexStringValue = /"\w+":"\w+"/g;
	const regexObjectValue = /"\w+":{.+}/g;

	wrongJson = wrongJson.replace(/\s/g, "");

	const objects = wrongJson.match(regexObjectValue);

	if(objects !== null){
		objects.forEach(object => {
			wrongJson = wrongJson.replace(object, "");
			object = `{${object}}`;
			fixedJson = Object.assign(fixedJson, JSON.parse(object));
		});
	}

	const strings = wrongJson.match(regexStringValue);

	
	if(strings !== null){
		strings.forEach(string => {
			wrongJson = wrongJson.replace(string, "");
			string = `{${string}}`;
			string = fixJson(string);
			fixedJson = Object.assign(fixedJson, JSON.parse(string));
		});
	}
	
	wrongJson = wrongJson.replace("{", "");
	wrongJson = wrongJson.replace("}", "");
	wrongJson = wrongJson.replace(",", "");

	const detectOpenPropName = wrongJson.match(/"/g);

	if(detectOpenPropName && detectOpenPropName.lenght == 1){
		wrongJson = wrongJson + '"';
	}
	
	const detectWithOutValue = wrongJson.match(/:/g);

	if(detectWithOutValue === null){
		wrongJson = wrongJson + ':"VALUE"';
	}

	return JSON.stringify(fixedJson);
}

console.log("Test 1:", fixJson('{"ndh": { "sdjfh": "dkfj", "dkjfsh": "dfjkshj" }, "ddl'));
