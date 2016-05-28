var request;
var sql = require('mssql');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
/* GET users listing. */

var config = {
    user: 'gaoy1',
    password: 'George321',
    server: 'titan.csse.rose-hulman.edu', // You can use 'localhost\\instance' to connect to named instance
    database: 'MitchGaoJim',
    parseJSON: true
};

function checkHacking(str,res){
  if(str.includes("'")||str.includes(";")||str.includes("/")) {
    console.log("dont hack me");
    res.render('infor', {message:"dont hack me"});
  }
  else return ;
};
exports.reg = function (req, res) {
  if(!req.cookies["email"]){
    res.render('reg.jade', {title: 'Register'});
  }
  else{
    res.render('reg.jade', {title:'Register',Name:jwt.decode(req.cookies["email"]).user});
  }
};

exports.back = function (req, res) {
	res.render('index');
};


exports.doreg = function (req, res) {
	usermail = req.body.usermail
  password = req.body.password

  checkHacking(usermail,res);
  checkHacking(password,res);

	sql.connect(config).then(function() {
  // Query
  console.log("You are in the database");

 // Query - returns 0 if user is in the table 1 if not
  var request = new sql.Request();
  request.query("EXEC ADD_USER '"+usermail+"', '"+password+"'", 
      function(err, recordsets, returnValue) {

  // ... error checks 
  console.log(recordsets[0]);
  console.log(recordsets[0].result);




  //determine if login successfully
  if (recordsets[0].result == 0 ){
    console.log("Adding User to Database");
      //res.sendFile(__dirname + "/home/loggedIn.html");
      res.render('infor', {message:"Congratulation! Now You Can Travel With Us!"});
  }
  else if(recordsets[0].result == 1){
      console.log("User Already Exist");
      res.render('infor', {message:"User Email already exists."});

  }
  else if(recordsets[0].result == 2){
    console.log("Invalid e-mail address format");
    res.render('infor', {message:"Invalid e-mail address format."});
  }
  else 
  {
    console.log("password is not appropriate");
    res.render('infor', {message:"Password is not in appropriate format"});
  }
  });

  }).catch(function(err) {
  // ... connect error checks
      console.log("It's not in database");
  });	
};
