var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose =require('mongoose')
var cors = require('cors')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// mongoose.connect('mongodb://127.0.0.1:27017/CurrencyKeepers', { useNewUrlParser: true})
// const db = mongoose.connection
// db.on('error', (error)=> console.error(error))
// db.once('open', ()=> console.error("Connected to Database"))

app.use(express.json())

const item =require("./routes/item")
const user =require("./routes/user")
const collection =require("./routes/collection")

app.use("/item", item)
app.use("/user", user)
app.use("/collection", collection)

app.listen(3000, ()=> console.log('Currency Keepers Server Started'))
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
