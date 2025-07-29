var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var cors = require("cors");

//Importing all the routes(API end-points)

const cartRouter = require("./Routes/cartRouter");
const userRouter = require("./Routes/userRouter");
const foodRouter = require("./Routes/foodRouter");
const orderRouter = require("./Routes/orderRouter");
var app = express();
app.use(cors()); // use for integration of backend with frontened

// view engine setup
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//using Routes
app.use("/food", foodRouter);
app.use("/user", userRouter);
app.use("/images", express.static("uploads"));
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
