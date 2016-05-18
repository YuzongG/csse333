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
console.log("cookies: ");
console.log(req.cookies);
console.log(req.path);
  if(req.path == '/' || req.path =='/reg' || req.path =='/login'){
    next();
    console.log(req.cookies);
    console.log("here");
  }
  else if(!req.cookies["user"]){
    res.send("Not authorized");
  }
  else {
    data = jwt.verify(req.cookies["user"], 'a-secret')
    if (data["user"] == null){
      res.send("Not authorized");
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
  res.render('index');
});

require('./routes').route(app);



module.exports = app;
