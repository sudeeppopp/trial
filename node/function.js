var  array = require("array");
var  fs = require("fs");
var datagrid = require("./js/datagrid.js");
var render = require("./js/render.js");
var parser = require("./js/parser.js");

output = "";
const THEME = "Themes(1)";
var theme = "empty";

function Load() {

var batches = __dirname + "/Theme/" + THEME + "/" + theme;
	try {
		fs.readFile(batches.replace("\js","").replace("\\","\/"), null, function(err, contents) {
		if(contents != null) {
			style = contents.toString();
			styled = contents.toString();
		}});
		
	}
	catch(Exception ) {     }
	finally { }

}

function batch() {
var theme = __dirname + "/Theme/" + THEME + "/" + "batch";

	try {
		fs.readFile(theme.replace("\js","").replace("\\","\/"), null, function(err, contents) {
		run(contents.toString()); 
		});
	}
	catch(Exception ) {     }
	finally { /*console.log(":" + fns);*/  }
}

settings = "";
setting();
function setting(set) {
var set = "./Theme/config.js";

	try {
		fs.readFile(set, null, function(err, contents) {
		settings = contents.toString(); 
		//console.log(settings);
		});
	}
	catch(Exception ) {     }
	finally {   }
}

var style = "";
var styled = "";
var clrs = "";
var sclr = "";
var clr1 = 012346;
var clr2 = 243560;

function stylen(len) {
var start = new Date().getTime();
//console.log(settings);
sclr = parser.parse(parseInt(start.toString().substr(1,6)), parseInt(start.toString().substr(7,12)),settings.split(':')[1].trim(),110111);
var w = "";
var h = ""; 
var bk = "";
for(i=0; i<clrs.split(' ').length;i++) {
	
	if(clrs.split(' ')[i].indexOf('width') >= 0 && w == "") {
		w = clrs.split(' ')[i];
	}else if(clrs.split(' ')[i].indexOf('height') >= 0 && h == "") {
		h = clrs.split(' ')[i];
}else if(clrs.split(' ')[i].indexOf('background-color') >= 0 && bk == "") { bk = clrs.split(' ')[i] + ' ' + clrs.split(' ')[i+1];}
}

var a = style.indexOf("pattern:");
var b = style.length;
if(b > 10) {
var cs = style.split("+ a +");
var pattern = style.substr(a,b);
clr = pattern.replace("pattern:", "");//substr(pattern.indexOf("0x")+2,6);
style = "";

	for(var a = 0; a < len; a++) 
	{
		style += cs[0].trim() + a + cs[1].replace('clr1',bk.split(':')[1].split(' ')[0]).replace('clr2',bk.split(':')[1].split(' ')[1]).replace("pattern:", "#para" + a);
	}
}	
	return ""/*"<style> " + style + " </style>"*/;
}			

function LOAD(THEME) {
	theme = THEME.split('/')[THEME.split('/').length - 1];
	wait(restyle,100);
	loadfile();
}

function restyle() {
var	sty = __dirname + "/Theme/" + THEME + "/" + theme;	
	try {
		fs.readFile(sty.replace("\js","").replace("\\","\/"), null, function(err, contents) {
		style = contents.toString(); });
	}
	catch(Exception ) {     }
	finally {   }
}

function script(clrs) {
	return clrs;
}

var clr = "0000xx";
function mapele(data) {
var b = "";
var t = "<table style = 'display: block;' class='rotate' >content</table>";
	try{ var d = "<tr>";
		var temp = 0;
		data.each(function(val,i){ 
		var myString = i.toString();
		var foo = parseInt(myString);
		d += "<td class = 'para' id = 'demo'>" + render.render(val,i,'red') + "</td>";

		if((foo+1) % 4 == 0)
     			d = d + "</tr><tr>";  
     			b += d; temp = foo++; d = '';
		}); 
		d = "<td class = 'para' id = 'demo'>" + render.render	(output,temp,'red') + "</td>";
		
		if((temp+1) % 4 == 0)
     			d = d + "</tr><tr>";  
     			b += d;

	}catch(Exception ) {   } finally {   }
	b += "</tr>"; b = b.replace("<tr></tr>", ""); d = "<tr>";
     return t.replace("content",b);
}

function wait(fn,ms){
	var start = new Date().getTime();
	var end = start;
	fn();
	while(end < start + ms) {
		end = new Date().getTime();
	}
}

var display = 0;
function LOAD_PARSER(str) {
var	sty = "./" + str;	
	try {
		fs.readFile(sty, null, function(err, contents) {
		chk = contents.toString();
		if(chk.indexOf('transform') >= 0 && chk.split(':').length == 2) display = 1; });
	}
	catch(Exception ) {     }
	finally {   }	

}

function run(fns) {
	wait(Load,0);	
	var funs = fns.split("\n");
	for(var i = 0; i < funs.length; i++) {
	try {
	switch(funs[i].split(':')[0].trim()) {
		
		case 'data':  wait(datagrid.datagrid,0); break;
		case 'style': LOAD(funs[i].split(':')[1].trim()); break;
		case 'parser': /*LOAD_PARSER*/setting(funs[i].split(':')[1].trim()); break;
		default: break;
	}
	}catch(Exception) { }
	finally { }
	}
	
}

function redirect(res) {
	var test = datagrid.query();
	if(test != null) {
	var html = "<html><head><script> function Submit() {window.location = 'http://localhost:8080/'+document.getElementById('form').value; } </script> clrsstyle </head><body onload='load()'>input output content</body></html>";
	html = html.replace("style", stylen(test.length));
	html = html.replace("clrs", script(sclr));
	html = html.replace("output", output);	
	html = html.replace("input", "<input id='form' value='hello' /><button onClick='Submit()'>Submit</button>");
	res.send(html.replace("content",mapele(test)));
	}
}

var  brain = require("./js/brain.js");

const config = {
  binaryThresh: 0.5,
  hiddenLayers: [3],
  activation: 'sigmoid',
  leakyReluAlpha: 0.01,
};

net = new brain.NeuralNetwork(config);
exports.brain = brain;
exports.config = config;
exports.net = net;
exports.batch = batch;
exports.redirect = redirect;