//  Route Handlers / Controllers ✅  Business Logic for Movie Resource

const fs = require("fs");
const path = require("path");

let movies = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/movies.json"))
);
// let movies = []
// convert json data to js-object
// let movies = JSON.parse(fs.readFileSync("./data/movies.json"));

exports.checkId = (req, res, next, value) => {
  console.log("Movie ID is " + value);

  // Find movie based on ID parameter.
  let movie = movies.find((el) => el.id === value * 1);

  if (!movie) {
    return res.status(404).json({
      status: "failed",
      message: "Movie with ID " + value + " is not found",
    });
  }

  next();
};

exports.getAllMovies = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.resquestedAt, // from custom middleware
    // envalping
    data: {
      movies: movies,
    },
  });
};

exports.getMovie = (req, res) => {
  const id = +req.params.id;

  let movie = movies.find((el) => el.id === id);

  // if (!movie) {
  //   return res.status(404).json({
  //     status: "failed",
  //     message: "Movie with ID " + id + " is not found",
  //   });
  // }

  res.status(200).json({
    stauts: "success",
    data: {
      movie: movie,
    },
  });
};

exports.validateBody = (req, res, next) => {
  if (!req.body.title || !req.body.year) {
    return res.status(400).json({
      status: "fail",
      message: "Missing required fields: title and year",
    });
  }
  next();
};

exports.createMovie = (req, res) => {
  let newId = movies[movies.length - 1].id + 1;

  const newMovie = Object.assign({ id: newId }, req.body);

  movies.push(newMovie);

  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    console.log("Error occur while adding data.", err);
    res.status(201).json({
      stauts: "success",
      data: {
        moive: newMovie,
      },
    });
  });
};

exports.updateMovie = (req, res) => {
  let id = +req.params.id;
  let movieToUpdate = movies.find((el) => el.id === id);

  // if (!movieToUpdate) {
  //   return res.status(404).json({
  //     status: "fail",
  //     message: "No movie object with ID " + id + " is found",
  //   });
  // }

  let index = movies.indexOf(movieToUpdate);

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

exports.deleteMoive = (req, res) => {
  const id = req.params.id * 1;

  const movieToDelete = movies.find((el) => el.id === id);

  // if (!movieToDelete) {
  //   return res.status(404).json({
  //     status: "fail",
  //     message: "No movie object with ID " + id + " is found to delete.",
  //   });
  // }

  const index = movies.indexOf(movieToDelete);

  movies.splice(index, 1);

  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    res.status(204).json({
      stauts: "success",
      data: {
        movie: null,
      },
    });
  });
};
