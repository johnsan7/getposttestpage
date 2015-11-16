//This code is straight out of the lecture, and is just set up. I changed the port number though

var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 1236);


//This is my get handler, the code is very similar to the lecture code since there not a lot of 
//Creative ways to do this. I have different names for variables and I have a typeName variable so
//I can have it tell you whether it was a post request. 

app.get('/show-data', function(req, res){
	var outList = [];  //Creates an "array" to add all data elements from the get received
	for(var thing in req.query){	//Pushese each key and value onto the array of data
		outList.push({'name' :thing, 'value' :req.query[thing]});
	}
	console.log(outList);
	var htmlObject = {};	//Creates an object to pass to the handlebars page
	htmlObject.dataList = outList;	//puts the list of things received into a dataList variable
	htmlObject.typeName = 'GET';		//Adds the name get as typeName so html page can report correctly
	res.render('getPrinter', htmlObject); 	//Displays output HTML page feeding it the object created 
											//to hold the data. 
	
});

//This is my post handler, the code is very similar to the lecture code since there not a lot of 
//Creative ways to do this. I have different names for variables and I have a typeName variable so
//I can have it tell you whether it was a post request.

app.post('/show-data', function(req, res){
	console.log('got into post function');
	var outList = [];  //Creates an "array" to add all data elements from the get received
	
	for(var thing in req.body)	//Pushese each key and value onto the array of data
	{
		outList.push({'name':thing, 'value':req.body[thing]});
		console.log('getting in post loop');
		
	}
	var htmlObject = {};  //Creates an object to pass to the handlebars page
	console.log(outList);
	htmlObject.dataList = outList;		//puts the list of things received into a dataList variable
	htmlObject.typeName = 'POST';			//Adds the name post as typeName so html page can report correctly
	res.render('getPrinter', htmlObject);	//Displays output HTML page feeding it the object created 
});											//to hold the data. 

//This is code straight out of the lecture and was written by the professor

app.use(function(req,res){
	res.status(404);
	res.render('404');
});
//This is code straight out of the lecture and was written by the professor

app.use(function(err,req,res,next){
	//console.error(err.stack);
	res.type('plain/text');
	res.status(500);
	res.render('500');	
});

//This is code straight out of the lecture and was written by the professor, except for my console message
app.listen(app.get('port'), function(){
	console.log('Started on port 1236');
	
});