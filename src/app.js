//Express Application made to target Risk Management tools

var express = require('express') ;
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');/*http request logger middleware for node.js*/
var cookieParser = require('cookie-parser');/*cookie parsing with signatures */ 
var bodyParser = require('body-parser');

//collect the environment variables
var env = require('node-env-file');
try{
    env('./src/process.env');
}
catch (e) {
    //there is no ./src/process.env file accessible
    //we need to check that the MONGOLAB_URI exist and we can connect to it.
    console.log(e);
    if (process.env.MONGOLAB_URI==undefined) {process.exit();}
}

var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI);

//mongoose.connect('localhost:27017/projet');

var RisqueSchema= require('./model/risque');
var ProjetSchema= require('./model/projet');

//Routes 
var routes = require('./routes/index');
var users = require('./routes/users');
var risk_route= require('./routes/risks');




var app = express();

console.log ("MONGO_LAB_URI "+process.env.MONGO_LAB_URI);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static('C:/DATA/GIT/project_management/client/src'));

// Make our db accessible to our router
/*app.use(function(req,res,next){
    req.db = db;
    next();
});*/

app.use('/', routes);
app.use('/users', users);
app.use('/risks', risk_route);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Ressource not found');
    err.status = 404;
    next(err);
});

/// error handlers

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



app.get('/', function(req, res) {
  console.log("Cookies: ", req.cookies)
});


/*console.log(process.env.foo);*/

module.exports = app;