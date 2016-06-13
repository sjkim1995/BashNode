var fs = require('fs');
var request = require('request')

var done = function(output, cmdList){
	console.log(cmdList);
	if (cmdList.length < 1) {
		console.log(output);
		process.stdout.write("\nprompt > ");
	}
	else {
		var shortened = cmdList.slice(1, cmdList.length)
		bashPrompts[cmdList[0]](output, null, shortened);
	}

}

var bashPrompts = {
	pwd: function(stdin, args, cmdList){
		done(process.cwd(), cmdList)
	},
	date: function(stdin, args, cmdList){
		done(new Date().toString(), cmdList)
	},
	ls: function(stdin, args, cmdList){
		var cwd = process.cwd();
		fs.readdir(cwd, function(err, data){
			if(err) throw err
			var str = '';
			data.forEach(function(file){
				str += file + "\n";

			})
			done(str, cmdList)
		})
	},
	echo: function(stdin, args, cmdList) {
		done(args, cmdList)
	},
	cat: function(stdin, args, cmdList){
		fs.readFile(args, function(err, data){
			if (err) throw err;

			done(data.toString(), cmdList)
		})
	},
	head: function(stdin, args, cmdList){
		if (stdin) {
			var str = stdin.toString();
			var arr = str.split('\n');
			var returnStr = ''
			for(var i=0; i < 5; i++){
				returnStr += arr[i];
				if (i < 4) {
					returnStr += "\n"
				}
			}
			done(returnStr, cmdList);
		}
		else { 
			fs.readFile(args, function(err, data){
				if(err) throw err;
				var str = data.toString();
				var arr = str.split('\n');
				var returnStr = ''
				for(var i = 0; i < 5; i++){
					returnStr += arr[i];
					if (i < 4) {
						returnStr += "\n"
					}
				}
			done(returnStr, cmdList)
			})
		}
	},
	tail: function(stdin, args, cmdList){
		if (stdin) {
			var str = stdin.toString();
			var arr = str.split('\n');
			var returnStr = '';
			for(var i=arr.length -6; i < arr.length - 1; i++){
				returnStr += arr[i];
				if (i < 4) {
					returnStr += "\n"
				}
			}
			done(returnStr, cmdList)	
		}
		else {	
			fs.readFile(args, function(err, data){
				if(err) throw err;
				var str = data.toString();
				var arr = str.split('\n');
				var returnStr = '';
				for(var i=arr.length -6; i < arr.length - 1; i++){
					returnStr += arr[i];
					if (i < 4) {
						returnStr += "\n"
					}
				}
				done(returnStr, cmdList)
			})
		}
	},
	sort: function (stdin, args, cmdList){
		if (stdin) {
			var str = stdin.toString();
			var arr = str.split('\n');
			var sorted = arr.sort(function(a,b) {
				return a.length > b.length;
			})
			var returnStr = '';
			sorted.forEach(function(line){
				returnStr += line + '\n'
			})
			done(returnStr, cmdList)				
		}
		else {
			fs.readFile(args, function(err, data){
				if (err) throw err;
				var str = data.toString();
				var arr = str.split('\n');
				var sorted = arr.sort(function(a,b) {
					return a.length > b.length;
				})
				var returnStr = '';
				sorted.forEach(function(line){
					returnStr += line + '\n'
				})
				done(returnStr, cmdList)		
			})
		}
	},	
	wc: function (stdin, args, cmdList){
		if (stdin) {
			var str = stdin.toString();
			var arr = str.split('\n');
			console.log(arr);
			done(arr.length, cmdList)			
		}
		else {
			fs.readFile(args, function(err, data){
				if (err) throw err;
				var str = data.toString();
				var arr = str.split('\n');
				done(arr.length, cmdList)			
			})
		}
	},	
	uniq: function (stdin, args, cmdList){
		if (stdin) {
			var str = stdin.toString();
			var arr = str.split('\n');
			for (var i = 0; i < arr.length; i++) {
				if (arr[i] == arr[i+1]) {
					// console.log("duplicate!");
					arr.splice(i, 1);
				}
			}		
			var returnStr = '';
			arr.forEach(function(line){
				returnStr += line + '\n'
			})
			done(returnStr, cmdList)			
		}
		else {
			fs.readFile(args, function(err, data){
				if (err) throw err;
				var str = data.toString();
				var arr = str.split('\n');
				for (var i = 0; i < arr.length; i++) {
					if (arr[i] == arr[i+1]) {
						// console.log("duplicate!");
						arr.splice(i, 1);
					}
				}		
				var returnStr = '';
				arr.forEach(function(line){
					returnStr += line + '\n'
				})
				done(returnStr, cmdList)
			})
		}
	},
	curl: function(stdin, args, cmdList){
		request(args, function(err, response, body){
			if(!err && response.statusCode === 200){
				done(response.body, cmdList)
			}
		})
	},
}

module.exports = bashPrompts;