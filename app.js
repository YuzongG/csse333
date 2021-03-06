var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sql = require('mssql');
var jwt = require('jsonwebtoken');
http = require('http');


routes = require('./routes');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/node_modules')));

// Middleware
app.use(function(req, res, next) {
  // var err = new Error('Not Found');
  // err.status = 404;

  if(req.path == '/' || req.path =='/reg' || req.path =='/login' 
    ||req.path == '/contact'||req.path=='/mainpage/logout'){
    next();
  }
  else if(!req.cookies["user"]){
    if(req.path == '/changePassword'){
      res.render('login');
      // res.render('infor', {message:'You have to login before you change the password!'})
    }
    res.render('login');
    // res.render('infor',{message:'Not authorized, Please Login'});
  }
  else {
    data = jwt.verify(req.cookies["user"], 'a-secret')
    if (data["user"] == null){
      res.render('login');
      //res.render('infor',{message:'Not authorized, Please Login'});

    }
    else{
      next();
    }
  }

});

// app.use('/', routes);
// app.use('/users', users);
// app.use(app.router);
routes.route(app);


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.get('/', function (req, res) {
  console.log(req.cookies["email"]);
  if(!req.cookies["email"]){
    res.render('index');
  }
  else{
    res.render('index', {Name:jwt.decode(req.cookies["email"]).user});
  }
});

require('./routes').route(app);



module.exports = app;
