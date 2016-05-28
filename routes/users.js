var express = require('express');
var sql = require('mssql');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
var email;

/* GET users listing. */


var config = {
    user: 'gaoy1',
    password: 'George321',
    server: 'titan.csse.rose-hulman.edu', // You can use 'localhost\\instance' to connect to named instance
    database: 'MitchGaoJim',
    parseJSON: true
};

function checkHacking(str,res){
  if(str.includes("'")||str.includes(";")||str.includes("/")||str.includes("=")||str.includes("$")) {
    console.log("Your input string contains illegal characters.");
    res.render('infor', {message:"Your input string contains illegal characters."});
  }
  else return ;
};
exports.login = function(req,res){
  if(!req.cookies["email"]){
    res.render('login.jade',{title: 'User Login'});
  }
  else{
    res.render('login.jade', {title:'User Login',Name:jwt.decode(req.cookies["email"]).user});
  }

};

exports.dologin = function(req,res){

  usermail = req.body.usermail;
  password = req.body.password;
  console.log(usermail);
  //check for injections
  checkHacking(usermail,res);
  checkHacking(password,res);
  console.log("aa");
  sql.connect(config).then(function() {
    // Query
    console.log("You are in the database");

   // Query - returns 0 if user is in the table 1 if not
    var request = new sql.Request();
    request.query("EXEC User_Verification '"+usermail+"','"+password+"'", 
    	function(err, recordsets, returnValue) {

    // ... error checks 
    console.log("login:");

    console.log(recordsets[0]);


    //determine if login successfully
    if (recordsets[0].result == 0 ) {
        console.log("login successfully");
        token = jwt.sign({user: usermail}, 'a-secret');
        token2 = jwt.sign({user:usermail},'usermail');
        console.log("token: ");             
        console.log(token);
        res.cookie('email',token2);
        res.cookie('user', token).render('mainpage',{Name:usermail});
    }
    else if(recordsets[0].result == 2){
      console.log("Invalid e-mail address format");
      res.render('infor',{message:'Invalid e-mail address format.'});
    }
    else if(recordsets[0].result == 3){
      console.log("IInvalid Email Address");
      res.render('infor',{message:'Invalid Email Address. Email does not exsit.'});
    }
    else if(recordsets[0].result == 4){
      console.log("Invalid Password");
      res.render('infor',{message:'Invalid Password'});
    }
    else
    {
      console.log("login failed");
      res.render('infor',{message:'login failed'});
    }
    });

    }).catch(function(err) {
    // ... connect error checks
        console.log("It's not in database");
    });
};
exports.changePassword = function(req,res){
  if(!req.cookies["email"]){
    res.render('changePassword.jade',{title: 'Change Password'});
  }
  else{
    res.render('changePassword.jade', {title:'Change Password',Name:jwt.decode(req.cookies["email"]).user});
  }
};
exports.doChangePassword = function(req,res){
    usermail = email;
    oldPassword = req.body.oldPassword;
    newPassword = req.body.newPassword;

    sql.connect(config).then(function() {
      // Query
      console.log("You are in the database");
      // Query - returns 0 if user is in the table 1 if not
      var request = new sql.Request();
      request.query("EXEC Change_Password '"+usermail+"','"+oldPassword+"','"+newPassword+"'", function(err,recordsets,returnvalue) {
        //determine if login successfully
        if(recordsets[0].result == 0){
          res.render('mainpage',{Name:usermail});
          console.log("changed");
        }
        else if(recordsets[0].result == 1){
          console.log("failed");
          res.render('infor', {message:'Old password does not match your account'})
        }
        else if(recordsets[0].result == 2){
          console.log("failed");
          res.render('infor', {message:'Please include at least 1 alphabet and 1 number'})
        }
        else
        {
          console.log("failed");
          res.render('infor', {message:'You have to login before you change the password!'})
        }
      });

    }).catch(function(err) {
    // ... connect error checks
        console.log("It's not in database");
    });
};

