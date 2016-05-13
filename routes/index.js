var express = require('express');
var crypto = require('crypto');

/* GET home page. */
users = require('./users');
regi = require('./reg');
mainpage = require('./mainpage')

exports.route = function(app){
	app.get('/login', login);
	app.post('/login', dologin);
	app.get('/reg', reg);
	app.post('/reg',doreg);
	app.post('/back',regback);
	app.get('/mainpage', getin);
};


getin = function(req,res) {
	return mainpage.show(req,res);
};

login = function(req,res) {
	return users.login(req,res);
};

dologin = function(req,res){
	return users.dologin(req,res);
};

reg = function(req,res){
	return regi.reg(req,res);
};

doreg = function(req,res){
	console.log("here");
	return regi.doreg(req,res);
};

regback = function(req,res){
	console.log("here2");
	return regi.back(req,res);
};
