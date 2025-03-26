function fixIncompleteJson(incompleteJson){
	const detectOpenPropName = incompleteJson.match(/"\w+[:|}|{]?/g);
	const detectWithOutValue = incompleteJson.match(/:/g);

	if(detectOpenPropName !== null){
		detectOpenPropName.forEach(openedName => {
			const start = incompleteJson.indexOf(openedName);  
			const end = start + openedName.length;
			
			if(end == incompleteJson.length){
				incompleteJson = incompleteJson + '"';
			} else {
				incompleteJson = incompleteJson.slice(0, end) + '"' + incompleteJson.slice(end + 1, incompleteJson.length);
			}
		});
	}
	
	if(detectWithOutValue === null){
		incompleteJson = incompleteJson + ':"VALUE"';
	}

	return JSON.parse(`{${incompleteJson}}`);
}

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
	
	if(wrongJson.length === 0) return JSON.stringify(fixedJson);

	return JSON.stringify(Object.assign(fixedJson, fixIncompleteJson(wrongJson)));
}

console.log("Test 1:", fixJson('{"ndh": { "sdjfh": "dkfj", "dkjfsh": "dfjkshj" }, "ddl'));
