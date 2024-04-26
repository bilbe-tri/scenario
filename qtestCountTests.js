1const request = require('request');
const modules = [9916567, 9916568, 40749674, 40968219, 40977323, 40992737, 9916582, 9916569];
const toplevel = 9899305;
const outputfile = "qtestdata.csv";
const baseUrl = "https://consultingdemo.qtestnet.com";
const APIToken = "Bearer 8c791e04-6d0c-48e3-bc1c-73f64e0c44f6";
const project = "93529"	//save as a string
var fs = require('fs');
var path = [];
var depth = 0;		//initialize4
var testCount = 0;  //initialize

//write the test case data to a csv file
function saveContent(mod, tc) {
	var content = "";
	var stepinfo = "";

	for(dir of path) {		//build the path to the test case
		content += "/" + dir;
	}
	content += ",";
	content += mod.pid + "," + mod.name + "," + tc.pid + "," + tc.id + "," + tc.order + "," + tc.name;
	/*
	1. build test info
	2. append test info
	3. for each step, append step info to test info
	4. append newline
	*/
	if(tc.test_steps.length == 0) {	//no steps, so just write the test info
		fs.appendFileSync(`${outputfile}`, content + "\n", function (err) {
		   if (err) throw err;
		   //console.log('Saved!');
		});
	} else {	//the test has steps, so iterate over the test_steps array
		//for(step of tc.test_steps) {					//iterate over steps, USE 'OF' for OBJECTS!!!
		for(let idx = 0; idx < tc.test_steps.length; idx++) {
			stepinfo = "," + (1 + idx);					//include step#, starting at 1
			//console.log("saveContent: step=" + tc.test_steps[idx] + " step#: " + (idx + 1)); 
			stepinfo += "," + tc.test_steps[idx].description + "," + tc.test_steps[idx].expected;
			//testcontent = content + stepinfo + "\n";		//append step details to test details
			
			fs.appendFileSync(`${outputfile}`, content + stepinfo + "\n", function (err) {
			   if (err) throw err;
			   //console.log('Saved!');
			});
		}
	}  //end else
}

//initialize options for modules API call
var options = {
    url: `${baseUrl}/api/v3/projects/${project}/modules?expand=descendants`,
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'Content-Type': 'application/json',
        'Authorization': `${APIToken}`
	}
};

//initialize options for test cases API call
var opts2 = {
    url: `${baseUrl}/api/v3/projects/${project}/test-cases?expandSteps=false&parentId=`,
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'Content-Type': 'application/json',
        'Authorization': `${APIToken}`
	}
};

//use this function to make synchronous API calls
function doRequest(url) {
  return new Promise(function (resolve, reject) {
    request(url, function (error, res, body) {
      if (!error && res.statusCode > 199 & res.statusCode < 300) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

//used for debugging
function visit0(module) {	//this finds all the modules correctly
	var p = "";
	path.push(module.name);
	for(dir of path) {
		p += "/" + dir;
	}
	//console.log("visit0: path[]=" + path);
	//
	console.log("visit0: " + module.name + " id: " + module.id + " parent_id: " + module.parent_id +	" path=" + p);
	//below is a made up test case argument
	//saveContent(module, {"id": 111, "order": 2, "pid": "TC-777", "name": "noname"});
	if(module.children != undefined) {
		for (child of module.children) {
			visit0(child);
			//console.log("child: " + child.name + " id: " + child.id);
		}
	}
	path.pop();
}

//Used to recursively visit a module tree.  Initially called with the top-most module.
//Function is async, so await may be used for additional API calls.
//N.B. Must use await on the recursive call to itself!
async function visit(module) {
	var p = "";
	path.push(module.name);		//append current module name
	//for(dir of path) {
	//	p += "/" + dir;
	//}
	//console.log("visit: " + module.name + " id: " + module.id + " parent_id: " + module.parent_id + " path=" + p);
	//Build API request to retrieve all test cases in current module
	opts2.url = `${baseUrl}/api/v3/projects/${project}/test-cases?expandSteps=true&parentId=` + module.id;
	let res = await doRequest(opts2);		//retrieve test cases. wait for response
	let tcs = JSON.parse(res);				//parse the returned JSON
	//console.log("visit: " + module.name + " id: " + module.id + " depth=" + depth);
	for(tc of tcs) {						//iterate over the test cases
		//console.log("   tc: " + tc.name);
		saveContent(module, tc);			//save each test case
	}
	if(module.children != undefined) {		//if there are child modules
		for (child of module.children) {	//walk the children... use OF to iterate over the object
		//for(let idx = 0; idx < module.children.length; idx++) {
			//visit(child);
			//await visit(module.children[idx]);
			await visit(child);				//since function is async, be sure to await on recursive call - or else!
		}
	}
	path.pop();					//remove current module name
}

async function countTests(module) {
	opts2.url = `${baseUrl}/api/v3/projects/${project}/test-cases?size=999&parentId=` + module.id;
	let res = await doRequest(opts2);
	let tcs = JSON.parse(res);
	testCount += tcs.length;
	return(tcs.length);
}

async function findTests(module) {
	
	if(module.children != undefined) {
		for(child of module.children) {
			depth++;
			await findTests(child);
			depth--;
		}
	}
	let count = await countTests(module);
	console.log("depth=" + depth + " mod=" + module.name + " tests=" +  count);
}

async function main() {
	//console.log("len=" + modules.length);
	var root = modules[0];
	let res0 = await doRequest(options);
	let tree = JSON.parse(res0);
	console.log("name: " + tree.name + " #children: " + tree.length);
	for(mod of tree) {
		//console.log("module=" + mod.name + " children=" + mod.children ? "yes" : "no");
		//console.log(JSON.stringify(mod));
		//console.log(mod.id + " " + mod.name + " " + (mod.children != undefined));
		await findTests(mod);
	}
	console.log("total tests=" + testCount);
	
	//path.push(tree.name);
	
	// loop this visit(tree);
	
	//traverse modules given array of module IDs
	/*for(m of modules) {
		console.log("mod=" + m);
		opts2.url = 'https://consultingdemo.qtestnet.com/api/v3/projects/117094/test-cases?expandSteps=false&parentId=' + m;
		let res = await doRequest(opts2);
		let tcs = JSON.parse(res);
		for(tc of tcs) {
			console.log("   tc: " + tc.name);
		}
	}*/
}

function pushtest() {
	var path = [];
	path.push("Ford");
	path.push("Chevy");
	console.log("pathlen=" + path.length + " " + path);
	path.pop();
	console.log("path=" + path);
}


main();
