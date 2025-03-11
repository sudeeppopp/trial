var funs = require('./function');
const out = require("./output");
const datagrid = require("./js/datagrid");

function frontRunner(net) { 
setTimeout( function(){ net.train([ { input: [0], output: [0] }, { input: [0.5], output: [0.5] }, { input: [1], output: [1] } ]); output = net.run([0.5]); }, 100); }

module.exports = app => { 

var router = require("express").Router();
app.get('/',router);

exe = (req,res) => {
	function exec() {
//	frontRunner(net);
//	funs.batch();
//	funs.redirect(res);
console.log(req.originalUrl);
if(req.originalUrl == '/' || req.originalUrl == '' || req.originalUrl.indexOf('.') > 0) {
		out.output(req.originalUrl.replace('/',''));
		frontRunner(net);
		funs.batch();
		funs.redirect(res);
	}

}
	exec();
};

router.get('/', exe );

app.get('/*', function(req,res) {
	if(req.originalUrl != '/' && req.originalUrl != '') {
		datagrid.append(req.originalUrl.replace('/',''));
		out.output(req.originalUrl.replace('/',''));
		frontRunner(net);
		funs.batch();
		funs.redirect(res);
	}
});

}