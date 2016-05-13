var sql = require('mssql');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var express = require('express');
var path = require('path');
var app = express()
/* GET users listing. */

var config = {
    user: 'gaoy1',
    password: 'George321',
    server: 'titan.csse.rose-hulman.edu', // You can use 'localhost\\instance' to connect to named instance
    database: 'MitchGaoJim',
    parseJSON: true
};

exports.show = function(req, res){
	res.render('mainpage.jade', {Name: 'yuzong'});
};


// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.post('/checkHotel',function(){
// 	console.log("131333133131")

// 	sql.connect(config).then(function() {
// 		console.log("131333133131")
// 		var request = new sql.Request();
// 		request.query("EXEC Show_hotel",function(err,recordsets,returnvalue){
// 			console.log(recordsets);
// 		});
// 	}).catch(function(err) {
//     // ... connect error checks
//         console.log("It's not in database");
//     });
// });
// exports.searchRest = function(req, res){

// 	sql.connect(config).then(function(){
// 		var request = new sql.Request();
// 		request.query("EXEC SEARCH IHD", function(err,recordsets,returnvalue){
// 			console.log(recordsets);
// 			myList2=recordsets;
// 			res.render('hotel',{title:'Hotels',results:myList2});
// 		});
// 	}).catch(function(err){
// 		console.log("It's not in database");
// 	});
// };



exports.getHotel = function(req, res){
	sql.connect(config).then(function() {
		var request = new sql.Request();
		request.query("EXEC Show_hotel",function(err,recordsets,returnvalue){
			console.log(recordsets);
			myList = recordsets;
			res.render('hotel', {title: 'Hotels', results:myList});
		});
	}).catch(function(err) {
    // ... connect error checks
        console.log("It's not in database");
    });
};
exports.searchRest = function(req, res){
	console.log("I am here")
	res.render('hotel.jade', {title: 'Search'});
};


exports.doSearch = function (req, res) {

	search = req.body.search

  	sql.connect(config).then(function() {
	    // Query
	    console.log("You are in the database");

	   // Query - returns 0 if user is in the table 1 if not
	    var request = new sql.Request();
	    sql.connect(config).then(function(){
			var request = new sql.Request();
			request.query("EXEC SEARCH "+search+"", function(err,recordsets,returnvalue){
				console.log(recordsets);
				myList2=recordsets;
				res.render('hotel',{title:'Hotels',results:myList2});
			});
		}).catch(function(err){
			console.log("It's not in database");
		});
	});
};

