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
	app.get('/mainpage/getHotel', getHotel);
	app.get('/mainpage/searchRest',searchRest);
	app.post('/mainpage/searchRest',doSearch);
	app.get('/mainpage/logout', logout);
	app.get('/contact',contact);
	app.get('/mainpage/getRestaurant', getRest);
	app.get('/mainpage/getEntertain',getEntertain);
	app.get('/mainpage/review',review);
	app.post('/mainpage/review',makeReview);
	app.get('/changePassword',changePassword);
	app.post('/changePassword',doChangePassword);
};

searchRest = function(req,res){
	console.log("Search now");
	return mainpage.searchRest(req,res);
};
doSearch = function(req,res){
	return mainpage.doSearch(req,res);
};
getHotel = function(req,res){
	console.log("get hotel right now");
	return mainpage.getHotel(req,res);
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
	return regi.doreg(req,res);
};

regback = function(req,res){
	return regi.back(req,res);
};

logout = function(req,res){
	return mainpage.logout(req,res);
};
changePassword = function(req,res){
	return users.changePassword(req,res);
};
doChangePassword = function(req,res){
	return users.doChangePassword(req,res);
};
contact = function(req,res){
	res.render('contact');
};

getRest = function(req,res){
	return mainpage.getRest(req,res);
};

getEntertain = function(req,res){
	return mainpage.getEntertain(req,res);
};
review = function(req,res){
	return mainpage.review(req,res);
};
makeReview = function(req,res){
	return mainpage.makeReview(req,res);
};