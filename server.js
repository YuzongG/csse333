var sql = require('mssql');
var http = require('http'),
fs = require('fs');
var express = require('express');
var handlebars = require('handlebars');
var app = express();  
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var config = {
    user: 'gaoy1',
    password: 'George321',
    server: 'titan.csse.rose-hulman.edu', // You can use 'localhost\\instance' to connect to named instance
    database: 'MitchGaoJim',
    parseJSON: true

   
}

// GET method route
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/home/index.html');

});

// POST method route
app.post('/goback',function(req,res){
    res.sendFile(__dirname + '/home/index.html');

});

app.post('/signup', function(req,res){
    //console.log(req.body);
     res.sendFile(__dirname+'/home/signup.html');
     // fs.readFile("home/signup.html", "utf-8", function(error, source){
     //        //var template1 = handlebars.compile(source);
     //        // var html = template1(userinfo);
     //        if(err){
     //            return console.log(err)
     //        }

     //    });

});
app.post('/adduser',function(req,res){
    console.log(req.body);
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
        
    }
    else if(recordsets[0].result == 1){
        console.log("User Already Exist");
    }
    else
    {
      console.log("Invalid e-mail address format");
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
});
app.post('/login', function (req, res) {
  console.log(req.body);
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
        //res.sendFile(__dirname + "/home/loggedIn.html");
        fs.readFile("home/loggedIn.html", "utf-8", function(error, source){
            var template1 = handlebars.compile(source);
            var html = template1(userinfo);
            res.send(html);

        });
    }
    else if(recordsets[0].result == 1){
    	console.log("Invalid Password");
    }
    else
    {
      console.log("login failed");
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

});

// sql.connect(config).then(function() {
//     // Query
//     console.log(11);

//    // Query 
//     var request = new sql.Request();
//     request.query(" select * from [User];", function(err, recordsets) {
//     // ... error checks 
//     console.log(recordsets); // return 
//     });


//     // ES6 Tagged template literals (experimental)

//     //sql.query`select * from mytable where id = ${value}`.then(function(recordset) {
//     //    console.dir(recordset);
//     //}).catch(function(err) {
//         // ... query error checks
//     //});
//     }).catch(function(err) {
//     // ... connect error checks
//         console.log("It's not in database");
// });

app.listen(8000);

// fs.readFile('home/index.html', function (err, html) {
//     if (err) {
//         throw err; 
//     }       
//     http.createServer(function(request, response) {  
//    //  sql.connect(config).then(function() {
//    //  // Query
//    //  console.log(11);

//    // // Query 
//    //  var request = new sql.Request();
//    //  request.query(" select * from [User];", function(err, recordsets) {
//    //  // ... error checks 
//    //  console.log(recordsets); // return 
//    //  });


//    //  // ES6 Tagged template literals (experimental)

//    //  //sql.query`select * from mytable where id = ${value}`.then(function(recordset) {
//    //  //    console.dir(recordset);
//    //  //}).catch(function(err) {
//    //      // ... query error checks
//    //  //});
//    //  }).catch(function(err) {
//    //  // ... connect error checks
//    //      console.log("It's not in database");
//    //  });


//         response.writeHeader(200, {"Content-Type": "text/html"});  
//         response.write(html);  
//         response.end();  
//     }).listen(8080);
// });



