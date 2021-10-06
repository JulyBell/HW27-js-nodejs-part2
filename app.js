var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var url = require('url');

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
  let fullLink = url.parse(req.url, true);
  let accessStatus = fullLink.query.secret;
  console.log(accessStatus);

  if(accessStatus === 'true'){
    res.end('Access approved');
  }else if(accessStatus === 'false'){
    res.end('Access denied');
  }else{
    next();
  }
})


module.exports = app;
