function foo({ event, constants, triggers }, context, callback) {
	//var payload = body;
	
	//console.log("typeof event=" + typeof arguments[0]);
	//console.log("typeof body=" + typeof body);
	//console.log("typeof payload=" + typeof payload);
	for(arg of arguments)	console.log(typeof arg);
}

foo("how", 7, {"id": 111});