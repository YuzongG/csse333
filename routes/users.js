var express = require('express');
var sql = require('mssql');
var bodyParser = require('body-parser');
var crypto = require('crypto');
/* GET users listing. */

var config = {
    user: 'gaoy1',
    password: 'George321',
    server: 'titan.csse.rose-hulman.edu', // You can use 'localhost\\instance' to connect to named instance
    database: 'MitchGaoJim',
    parseJSON: true
};

exports.login = function(req,res){
	res.render('login.jade',{title: 'User Login'});
};

exports.dologin = function(req,res){

  usermail = req.body.usermail
  password = req.body.password
  sql.connect(config).then(function() {
    // Query
    console.log("You are in the database");

   // Query - returns 0 if user is in the table 1 if not
    var request = new sql.Request();
    request.query("EXEC User_Verification '"+usermail+"','"+password+"'", 
    	function(err, recordsets, returnValue) {

    // ... error checks 
    console.log("login:");
    console.log(usermail);
    console.log(password);
    console.log(recordsets[0]);
    console.log(recordsets[0].result);




    //determine if login successfully
    if (recordsets[0].result == 0 ){
      console.log("login successfully");
        var userinfo = {
        //  stick in data from the database HERE!!!!!!!!
            username: usermail,
            //Lname: "David"
        };
        res.send(usermail + ' Login successfully');
        //res.sendFile(__dirname + "/home/loggedIn.html", usermail);
        
    }
    else if(recordsets[0].result == 1){
    	console.log("Invalid Password");
      res.send("Invalid Password");
    }
    else
    {
      console.log("login failed");
      res.send("login failed");
    }
    });


    // ES6 Tagged template literals (experimental)

    //sql.query`select * from mytable where id = ${value}`.then(function(recordset) {
    //    console.dir(recordset);
    //}).catch(function(err) {
        // ... query error checks
    //});
    }).catch(function(err) {
    // ... connect error checks
        console.log("It's not in database");
    });
};

