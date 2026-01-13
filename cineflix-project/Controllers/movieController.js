//  Route Handlers / Controllers ✅  Business Logic for Movie Resource

const Movie = require("../Models/movieModel")


exports.getAllMovies = async (req, res) => {
  try {

    const movies = await Movie.find();
    res.status(200).json({
      status: 'success',
      data: {
        movies: movies
      }
    })

  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error.message
    });
  }
};

exports.getMovie = async (req, res) => {
  try {

    // const movie = await Movie.find({ _id: req.params.id });
    // 2nd method ✅

    const movie = await Movie.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        movie: movie
      }
    })

  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error.message
    });
  }

};

exports.createMovie = (req, res) => {
  // const testMovie = new Movie({}); // create a new movie object using Movie model.
  // testMovie.save(); // save move in database

  // new approcach ✅
  try {
    const movie = Movie.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        movie: movie,
        // when value property is name as key, in ES6 we don't need to assign it, just key works same.
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message
    });
  }

};

exports.updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({
      status: 'success',
      data: {
        movie: updatedMovie,
      }
    })

  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error.message
    });
  }
}


exports.deleteMoive = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error.message
    });
  }
};
