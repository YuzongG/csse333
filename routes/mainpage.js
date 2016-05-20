var sql = require('mssql');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var express = require('express');
var path = require('path');
var jwt = require('jsonwebtoken');
/* GET users listing. */

var config = {
    user: 'gaoy1',
    password: 'George321',
    server: 'titan.csse.rose-hulman.edu', // You can use 'localhost\\instance' to connect to named instance
    database: 'MitchGaoJim',
    parseJSON: true
};

exports.show = function(req, res){
  if(!req.cookies["email"]){
    res.render('mainpage.jade');
  }
  else{
    res.render('mainpage.jade', {Name:jwt.decode(req.cookies["email"]).user});
  }
};


exports.getHotel = function(req, res){
	sql.connect(config).then(function() {
		var request = new sql.Request();
		request.query("EXEC Show_View Hotels",function(err,recordsets,returnvalue){
			console.log(recordsets);
			myList3 = recordsets;
			res.render('hotel', {title: 'Hotels', results:myList3, columns:[{0:'Name', 1:'Phone Number', 2:'Detail', 3:'Rating' }]});
		});
	}).catch(function(err) {
    // ... connect error checks
        console.log("It's not in database");
    });
};
exports.getAttraction = function(req, res){
  sql.connect(config).then(function() {
    var request = new sql.Request();
    request.query("EXEC Show_View Attractions",function(err,recordsets,returnvalue){
      console.log(recordsets);
      myList3 = recordsets;
      res.render('hotel', {title: 'Attractions', results:myList3, columns:[{0:'Name', 1:'Phone Number', 2:'Detail', 3:'Rating',4:'Address' }]});
    });
  }).catch(function(err) {
    // ... connect error checks
        console.log("It's not in database");
    });
};


exports.getRest = function(req,res){
	sql.connect(config).then(function() {
		var request = new sql.Request();
		request.query("EXEC Show_view RestaurantView",function(err,recordsets,returnvalue){
			myList = recordsets;
			res.render('hotel', {title: 'Restaurants', results:myList, columns:[{0:'Restaurant Name', 1:'Phone Number', 2:'Rating (5.0)', 3:'Details', 4:'Address',5:'Served by'}]});
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
			res.render('hotel', {title: 'Entertainments', results:myList, columns:[{0:'Entertainment Type', 1:'Name', 2:'Phone Number', 3:'Detail',4:'Rating', 5:'Address'}]});
		});
	}).catch(function(err) {
    // ... connect error checks
        console.log("It's not in database");
    });
}

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
      request.query("EXEC SEARCH '"+search+"'", function(err,recordsets,returnvalue){
        console.log(recordsets);
        myList2=recordsets;
        res.render('hotel',{title:'Search Result for '+search+"'",results:myList2, columns:[{0:'Food/Drink', 1:'Restaurant', 2:'Phone Number', 4: 'Rating', 5: 'Serving Type'}]});
      });
    }).catch(function(err){
      console.log("It's not in database");
    });
  });
};

exports.review = function(req, res){
    

  if(!req.cookies["email"]){
    res.render('review.jade', {title: 'Review'});
  }
  else{
    usermail = jwt.decode(req.cookies["email"]).user;

    sql.connect(config).then(function() {
    // Query
      var request = new sql.Request();
      request.query("EXEC ViewReview '"+usermail+"'",function(err,recordsets,returnvalue){
        console.log(recordsets);
     
        res.render('review.jade', {title:'Review',results:recordsets, columns:[{0:'Name', 1:'Content', 2:'Rating'}],Name:jwt.decode(req.cookies["email"]).user});

       });
    });

  }
};
exports.deleteReview = function (req, res) {
  if(!req.cookies["email"]){   
    username = null;
  }
  else{
    usermail = jwt.decode(req.cookies["email"]).user;
  }
  deletePlace = req.body.deletePlace;


    sql.connect(config).then(function() {
    // Query
   
   // Query - returns 0 if user is in the table 1 if not
    var request = new sql.Request();
    
    request.query("EXEC DELETE_REVIEW '"+usermail+"','"+deletePlace+"'", function(err,recordsets,returnvalue) {
    console.log(recordsets[0]);

    //determine if login successfully
    if(recordsets[0].result == 0){
      this.review(req,res);
    }
    else 
    {
      console.log("Review does not exist");
      res.render('infor', {message:"Review does not exist"});
    }
    });

    }).catch(function(err) {
    // ... connect error checks
        console.log("It's not in database");
    });
};
exports.editReview = function (req, res) {
  if(!req.cookies["email"]){   
    username = null;
  }
  else{
    usermail = jwt.decode(req.cookies["email"]).user;
  }
  editPlace = req.body.editPlace;
  editContent = req.body.editContent;
  editRating = req.body.editRating;

    sql.connect(config).then(function() {
    // Query
   
   // Query - returns 0 if user is in the table 1 if not
    var request = new sql.Request();
    
    request.query("EXEC EDIT_REVIEW '"+usermail+"','"+editPlace+"','"+editContent+"','"+editRating+"'", function(err,recordsets,returnvalue) {

    //determine if login successfully
    if(recordsets[0].result == 0){
      this.review(req,res);
    }
    else if(recordsets[0].result == 1){
      console.log("Place name is invalid");
      res.render('infor', {message:"Place name is invalid"});
    }
    else if(recordsets[0].result == 2){
      console.log("Invalid Usermail");
      res.render('infor', {message:"Invalid Usermail"});
    }
    else if(recordsets[0].result == 3){
      console.log("Review Does not exist");
      res.render('infor', {message:"Review does not exist"});
    }
    else 
    {
      console.log("Rating is out of Range");
      res.render('infor', {message:"Rating is out of Range"});
    }
    });
    }).catch(function(err) {
    // ... connect error checks
        console.log("It's not in database");
    });
};
exports.makeReview = function (req, res) {
  if(!req.cookies["email"]){   
    username = null;
  }
  else{
    usermail = jwt.decode(req.cookies["email"]).user;
  }
  place = req.body.place;
  content = req.body.content;
  rating = req.body.rating;


    sql.connect(config).then(function() {
    // Query
   
    var request = new sql.Request();
    
    request.query("EXEC INSERT_Review '"+usermail+"','"+place+"','"+content+"','"+rating+"'", function(err,recordsets,returnvalue) {

    console.log("review:");

    console.log(recordsets[0]);

    //determine if login successfully
    if(recordsets[0].result == 0){
      this.review(req,res);
      
    }
    else if(recordsets[0].result == 1){
      console.log("Place name is invalid");
      res.render('infor', {message:"Place name is invalid"});
    }
    else if(recordsets[0].result == 2){
      console.log("Invalid Usermail");
      res.render('infor', {message:"Invalid Usermail"});
    }
    else if(recordsets[0].result == 3){
      console.log("Review Already exist");
      res.render('infor', {message:"Review Already exist"});
    }
    else 
    {
      console.log("Rating is out of Range");
      res.render('infor', {message:"Rating is out of Range"});
    }
    });
    }).catch(function(err) {
    // ... connect error checks
        console.log("It's not in database");
    });
};

exports.logout = function(req,res){
  if(req.cookies["user"]){
        res.clearCookie("email");
    res.clearCookie("user").redirect('/');
  }
  else{
    res.render('infor',{message:'you are already logged out'});
  }
};