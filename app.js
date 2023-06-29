
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//const { Auth, AuthType } = require('@qlik/sdk');

/*
const config = {
  authType: AuthType.OAuth2,
  host: 'https://pr55hx3zw2skfny.us.qlikcloud.com',
  clientId: 'a1e886de1aa8b53970f1e0adcdff04ff',
  clientSecret: "ece5acccb797cee2c5ad4ab9c2dee3701d0c90d26bce9a0a4df164bcc6012fd8",
  redirectUri: '' //window.location.origin
};

(async () => {
  const auth = new Auth(config);
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  if (code) {
    await auth.authorize(window.location.href); // exchanges the credentials for a token
    window.history.pushState({}, "", "/");
    await renderPieChart(auth);
  } else if (!(await auth.isAuthorized())) { 
      {
          const { url } = await auth.generateAuthorizationUrl();
          window.location = url;
      }
  }
})();
*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route-handling code
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
