const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');
const cors = require('cors');
require('dotenv').config()

const passport_helper = require('./helpers/passport.helper');

var routes = require('./routes/index.router')
var repository = require('./repositories/init')

var app = express();

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

repository.initialize()

var server = http.createServer(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(passport_helper.getPassport().initialize());
app.use('/', routes);

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

if (process.env.NODE_ENV !== 'test') {
  server.listen(port);
}  

console.log("Running at Port number " + port);

server.on('error', onError);
server.on('listening', onListening);

module.exports = server; // for testing

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  
  var bind = typeof port === 'string'
  ? 'Pipe ' + port
  : 'Port ' + port;
  
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
    console.error(bind + ' requires elevated privileges');
    process.exit(1);
    break;
    case 'EADDRINUSE':
    console.error(bind + ' is already in use');
    process.exit(1);
    break;
    default:
    throw error;
  }
}

/**
* Event listener for HTTP server "listening" event.
*/

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
  ? 'pipe ' + addr
  : 'port ' + addr.port;
}

function normalizePort(val) {
  var port = parseInt(val, 10);
  
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  
  if (port >= 0) {
    // port number
    return port;
  }
  
  return false;
}


