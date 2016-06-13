var Commands = require('./commands')
// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
	var cmdString = data.toString().trim();
	var allCMD = cmdString.split(/\s*\|\s*/g);
	var cmdList = allCMD.slice(1, allCMD.length);
	var arr = allCMD[0].toString().trim().split(" "); // remove the newline
	var firstCMD = arr[0];
	arr = arr.slice(1, arr.length);
	var args = arr.join(" ");
	var stdin = null;
	Commands[firstCMD](stdin, args, cmdList);

});



