const express     = require('express'),
      path        = require('path'),
      bodyParser  = require('body-parser'),
      cors        = require('cors'),
      favicon     = require('serve-favicon'),
      logger      = require('morgan'),
      busboyBodyParser = require('busboy-body-parser');

// const passport = require('passport');
// const mongoose = require('mongoose');
// const config = require('./config/database');


// Connect to Database
// mongoose.connect(config.database);

// Other way to Connected to Database
// mongoose.Promise = global.Promise;
// mongoose.connect(config.database)
//     .then(() => console.log('connection successful to ' + config.database))
//     .catch((err) => console.error(err));

// On Connection
// mongoose.connection.on('connected', () => {
//   console.log('Connection successful to ' + config.database);
// });

// On Error
// mongoose.connection.on('error', (err) => {
//   console.log('Connection error :' + err);
// });

const app = express();

// Set Static Folder
// app.use(express.static(path.join(__dirname, 'dist')));
app.use('/picture/uploads', express.static(__dirname + '/uploads'));

// Set frontend folder with concurrently run
// app.use(express.static(path.join(__dirname, 'public')));

const user = require('./routes/users');
const book = require('./routes/books');
const chat = require('./routes/chats');
const upload = require('./routes/upload');

// CORS Middleware
app.use(cors());

app.use(logger('dev'));
app.use(busboyBodyParser({limit : '5mb'}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));


app.use('/book', book);
app.use('/user', user);
app.use('/chat', chat);
// upload file using gridFs and ng2-file-upload
app.use('/upload', upload);

/* catch 404 and forward to error handler */
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/* error handler */
app.use(function(err, req, res, next) {
  /* set locals, only providing error in development */
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  /* render the error page */
  res.status(err.status || 500);
  res.render('error');

  /* render response in json format */
  // res.json({
  //   message: err.message,
  //   error: err
  // });
});

module.exports = app;