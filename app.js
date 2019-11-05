var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); // 处理跨域

//  以下引入的是自定义模块，其实就是引入js文件
//  下面引入的是后端路由文件
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goodsRouter = require('./routes/goods');
var cartRouter = require('./routes/cart');
var userRouter = require('./routes/user');
var jsonpRouter = require('./routes/jsonp');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var fenleiRouter = require('./routes/fenlei');


// 连接mongodb数据库
require('./db/connect')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());// 解决跨域问题

// 使用路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/goods', goodsRouter);
app.use('/cart', cartRouter);
app.use('/user', userRouter);
app.use('/jsonp', jsonpRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/fenlei', fenleiRouter);
// app.use('/fenlei',fenleiRouter);

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

// module.exports = app;
app.listen(3100,() => {console.log('your server is running at 3100')})
