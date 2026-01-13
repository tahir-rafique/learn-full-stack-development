//   Everything related to Express.js gose here............

//  Middleware ✅
const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const movieRouter = require("./Routes/movieRoute");

const app = express();
// const movieRouter = express.Router();
//  express.router Returns a mibdleware router object.

// built-in middleware ✅
app.use(express.json());

//  Servering Static file using built-in static middleware ✅
app.use(express.static("./public"));

// 3rd party middleware ✅

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//  when we use "use method" it will be applied to all the incoming request.
// button we can also use middleware on specific route as well.

//  here we are using express.json() middleware

//  to use middleware on app we need "use() method" on the 'app' object.
// in use() method we pass the middleware which we want to use.

//  this middleware adds "request body" to "request object" in the 1st argument of callback.
//  So, for each request handler fnc/callbac we recieve req & res object.
// but by-default express do not add "body" to req object, to add body in req object we use middleware.

// Custom Middleware ✅

//  middleware function recive 3 argument,
// req & res-object, & next function
const logger = function (req, res, next) {
  console.log("Custom Middleware called");
  next();
};
app.use(logger);

// we can define middleware inside this use() method directly as well.
app.use(function (req, res, next) {
  req.resquestedAt = new Date().toISOString();
  next();
});

// Order in which Middleware defines matters a lot ✅✅✅

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello world", status: 200 });
});

app.use("/api/v1/movies", movieRouter);
// here we pass the "movieRouter" middleware to app
// so, here bascially we are mounting the middleware "movieRouter" on "/api/v1/movies" route

module.exports = app;
