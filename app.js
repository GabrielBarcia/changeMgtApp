var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');

var mongoose = require('mongoose');
var models = { account: require('./models/users')(mongoose) };

var app = express();

mongoose.connect ('mongodb://localhost/change_mgt_app');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'ssshhhhhhh',
    resave: false, //save session on every request
    saveUninitialized: true, //
    cookie: { maxAge: 30000000 }
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

var userSession;

//var appRoutes = { ctrl: require ('./routes/appRoutes')( models, mongoose )} ;
var ctrl= {
    server: require('./routes/appRoutes')() ,
    users:  require('./routes/usersRoutes')(models, mongoose)
};


//Routes
app.get( '/', ctrl.server.serveLogin );
app.get( '/app', ctrl.server.checkSession, ctrl.server.serveApp );

//app.get( '/red', ctrl.server.redirect );

app.post ( '/users/loginRequest', ctrl.users.loginRequest );


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

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


module.exports = app;
var server = function() {
    console.log('Server started on port 5000....');
    app.listen(5000);
}();
