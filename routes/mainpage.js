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
			res.render('hotel', {title: 'Hotels', results:myList, columns:[{0:'Name', 1:'Phone Number', 2:'Introduction', 3:'Rating' }]});
		});
	}).catch(function(err) {
    // ... connect error checks
        console.log("It's not in database");
    });
};
exports.searchRest = function(req, res){
	res.render('hotel.jade', {title: 'Search'});
};


exports.doSearch = function (req, res) {

	search = req.body.search
	if(search==""){//handles null input value
		search="''";
	}

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
				res.render('hotel',{title:'Search Result for '+search,results:myList2, columns:[{0:'Name', 1:'Food', 2:'Phone Number', 4: 'Rating', 5: 'Serving Type'}]});
			});
		}).catch(function(err){
			console.log("It's not in database");
		});
	});
};

exports.logout = function(req,res){
	res.clearCookie("user").redirect('/');
};

exports.getRest = function(req,res){
	sql.connect(config).then(function() {
		var request = new sql.Request();
		request.query("EXEC Show_view Restaurants",function(err,recordsets,returnvalue){
			myList = recordsets;
			res.render('hotel', {title: 'Restaurants', results:myList, columns:[{0:'Restaurant', 1:'Food', 2:'Phone Number', 3:'Rating', 4:'Serving Type'}]});
		});
	}).catch(function(err) {
    // ... connect error checks
        console.log("It's not in database");
    });
}

exports.getEntertain = function(req,res){
	sql.connect(config).then(function() {
		var request = new sql.Request();
		request.query("EXEC Show_view fun_place",function(err,recordsets,returnvalue){
			myList = recordsets;
			res.render('hotel', {title: 'Entertainments', results:myList, columns:[{0:'Entertainment Type', 1:'Name', 2:'Start Time', 3:'Ending Time', 4:'Phone Number', 5:'Rating', 6:'Detail', 7:'Address'}]});
		});
	}).catch(function(err) {
    // ... connect error checks
        console.log("It's not in database");
    });
}
