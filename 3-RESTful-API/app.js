//  step-1 : import express package
const express = require("express");
const fs = require("fs");

// step-2 : store in a variable
const app = express();
// let movies = JSON.parse(fs.readFileSync("./data/movies.json")); // convert json data to js-object
let movies = [];

//  Step - 7:
app.use(express.json());

//  here we are using express.json() middleware

//  to use middleware on app we need "use() method" on the 'app' object.
// in use() method we pass the middleware which we want to use.

//  this middleware adds "request body" to "request object" in the 1st argument of callback.
//  So, for each request handler fnc/callbac we recieve req & res object.
// but by-default express do not add "body" to req object, to add body in req object we use middleware.

// Custom Middleware ✅

//  middleware function recive 3 argument,
// req,res object, & next function
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

// order in which Middlerware defines matter a lots.

// ...............................Re-factoring the code................................... ✅
//  Route Handler Functions

const getAllMovies = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.resquestedAt, // from custom middleware
    // envalping
    data: {
      movies: movies,
    },
  });
};

const getMovie = (req, res) => {
  // console.log(req.params); // req has "params" property which is an object.

  const id = +req.params.id; // + operator convert "string" to a "number"

  // find method we can use on an Array, here finding movie on the base of same id.
  let movie = movies.find((el) => el.id === id);

  if (!movie) {
    return res.status(404).json({
      status: "failed",
      message: "Movie with ID " + id + " is not found",
    });
  }

  res.status(200).json({
    stauts: "success",
    data: {
      movie: movie,
    },
  });
};

const createMovie = (req, res) => {
  // console.log(req.body); // this will give "undefine" bydefault before using middleware.
  //  In order to send "body" with req-object we have to use a "middleware".

  // console.log(req.body); // know this will give data incoming with request.

  let newId = movies[movies.length - 1].id + 1; // this will return index for last movie object & added 1

  const newMovie = Object.assign({ id: newId }, req.body); // Object.assing merge two/2 object.

  // push to array
  movies.push(newMovie);

  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    console.log("Error occur while adding data.", err);

    // when we make a POST request to the server, on the server a new object will be created. So in the response we should get that new Object which has been created on the Server.

    //  as we creating a New resource / object status code will be 201.
    res.status(201).json({
      stauts: "success",
      data: {
        moive: newMovie,
      },
    });
  });
  // res.send("Created");
};

const updateMovie = (req, res) => {
  let id = +req.params.id; // * operator with 1 convert "string" to a "number"
  let movieToUpdate = movies.find((el) => el.id === id);

  // if movie with that ID is not already in your data/database then send this
  if (!movieToUpdate) {
    return res.status(404).json({
      status: "fail",
      message: "No movie object with ID " + id + " is found",
    });
  }

  let index = movies.indexOf(movieToUpdate); // e.g id = 3 , idx = 2

  Object.assign(movieToUpdate, req.body);

  movies[index] = movieToUpdate;

  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    res.status(200).json({
      stauts: "success",
      data: {
        movie: movieToUpdate,
      },
    });
  });
};

const deleteMoive = (req, res) => {
  const id = req.params.id * 1; // req.params.id returns (id) value as string ,we need to convert it into numeric by * multiply with 1.

  const movieToDelete = movies.find((el) => el.id === id);

  // if movie with that ID is not already in your data/database then send this
  if (!movieToDelete) {
    return res.status(404).json({
      status: "fail",
      message: "No movie object with ID " + id + " is found to delete.",
    });
  }

  const index = movies.indexOf(movieToDelete);

  //  splice method accept 2 argument, 1st index of elem which you want to delete, 2nd num of elem to which we want to delete from that index.
  movies.splice(index, 1); // here we want to delete 1 element.

  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    res.status(204).json({
      stauts: "success",
      data: {
        movie: null,
      },
    });
  });
};

try {
  const data = fs.readFileSync("./data/movies.json", "utf-8");
  movies = JSON.parse(data);
} catch (err) {
  console.error("❌ Failed to read or parse ./data/movies.json:", err.message);
}

// step-3 : Define a API-route + HTTP method or backend application route.
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello world", status: 200 });
});

// Step-4 : define port number and listen app/ start app.
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Your backend is running at port ${PORT}`);
});

// ✅
// ✅✅
// ✅✅✅

//  CRUD-method :  HTTP-request  GP ( GET, POST, PUT/PATCH, DELETE)

//  Step - 5 :
//  1.end-point,  2.request-handler-fnc/callback.
// 1st - Argument: api-endpoint / request a URL
// 2nd - Argument: request Handler fnc / a callback fnc\

// GET -  api/movies ( get all data from this api-endpoint )
// app.get("/api/v1/movies", getAllMovies);

//  Step - 6 :
//  POST - ( add a new moives to the same api-endpoint ).
// app.post("/api/v1/movies", createMovie);

//  Step - 8 :
//  GET & Route Parameter
//  GET - api/v1/movies/:id ( get a specific movie from this api-endpoint )
// app.get("/api/v1/movies/:id", getMovie);

//  Step - 9 :
//  PUT & PATCH,
//  PUT: update complete data , we need to send entire object with request body
// PATCH: update specific part of data, we only send partial object with updated property values with req body.
// app.patch("/api/v1/movies/:id", updateMovie);

//  Step - 10 :
//  DELETE
// app.delete("/api/v1/movies/:id", deleteMoive);

//  further modfication of end-points, uisng route() method and chaning for same "api-endpoint"
app.route("/api/v1/movies").get(getAllMovies).post(createMovie);

app
  .route("/api/v1/movies/:id")
  .get(getMovie)
  .delete(deleteMoive)
  .patch(updateMovie);
