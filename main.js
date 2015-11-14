

var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/show-data', function(req, res){
	var params = [];
	for(var p in req.query){
		params.push({'name' :p, 'value' :req.query[p]})
	}
	var context = {};
	context.dataList = params;
	context.typeName = 'GET';
	res.render('getPrinter', context);
	//console.log(context);
	
});

app.post('/show-data', function(req, res){
	//console.log('got into post function');
	var parameters = [];
	
	for(var p in req.body)
	{
		parameters.push({'name':p, 'value':req.body[p]});
		//console.log('getting in post loop');
		
	}
	var context = {};
	//console.log(parameters);
	context.dataList = parameters;
	context.typeName = 'POST';
	res.render('getPrinter', context);
});
/*
app.get('/other-page', function(req,res){
	res.render('other-page')
	
	
});
*/

app.use(function(req,res){
	res.status(404);
	res.render('404');
});

app.use(function(err,req,res,next){
	//console.error(err.stack);
	res.type('plain/text');
	res.status(500);
	res.render('500');	
});

app.listen(app.get('port'), function(){
	console.log('Started on port 3000');
	
});