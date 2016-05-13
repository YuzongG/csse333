var request;
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


exports.reg = function (req, res) {
	res.render('reg.jade', {title: 'Register'});
};

exports.back = function (req, res) {
	res.render('index');
};


exports.doreg = function (req, res) {
	usermail = req.body.usermail
  	password = req.body.password

  	sql.connect(config).then(function() {
    // Query
    console.log("You are in the database");

   // Query - returns 0 if user is in the table 1 if not
    var request = new sql.Request();
    request.query("EXEC Check_User_Email '"+usermail+"'", 
        function(err, recordsets, returnValue) {

    // ... error checks 
    console.log(recordsets[0]);
    console.log(recordsets[0].result);




    //determine if login successfully
    if (recordsets[0].result == 0 ){
      console.log("Adding User to Database");
        var userinfo = {
        //  stick in data from the database HERE!!!!!!!!
            username: usermail,
            password: password,
            //Lname: "David"
        };
        request.query("Insert into [User] Values('"+usermail+"','"+password+"',0)")
        //res.sendFile(__dirname + "/home/loggedIn.html");
        res.send("successfully");
    }
    else if(recordsets[0].result == 1){
        console.log("User Already Exist");
        res.send("User Already Exist");

    }
    else
    {
      console.log("Invalid e-mail address format");
      res.send("Invalid e-mail address format");

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
