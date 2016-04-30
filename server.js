var sql = require('mssql');
var http = require('http'),
fs = require('fs');
var express = require('express');
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



