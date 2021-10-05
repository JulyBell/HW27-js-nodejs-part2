var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var url = require('url');
var fl = 'http://localhost:3000/forbidden?secret=true';
var fullLink = url.parse(fl, true);

let accessStatus = fullLink.query.secret;
console.log(accessStatus);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(function(req, res, next){
  if(req.url == '/home'){
    res.end('Home');
  }else{
    next();
  }
});

app.use(function(req, res, next){
  if(req.url == '/forbidden?secret=' + accessStatus){
    res.end('Access approved');
  }else if(req.url == '/forbidden?secret=' + !accessStatus){
    res.end('Access denied');
  }
})


module.exports = app;
