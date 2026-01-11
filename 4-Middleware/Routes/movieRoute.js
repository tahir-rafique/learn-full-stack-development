const express = require("express");

const movieController = require("../Controllers/movieController");

const router = express.Router();

// Param Middleware ✅
// Special middleware, which only runs for certain "route-parameter".
//  "param middleware" accept a "route-parameter" &  a "middleware func"

router.param("id", movieController.checkId);

router
  .route("/")
  .get(movieController.getAllMovies)
  .post(movieController.validateBody, movieController.createMovie);
// Chaning multiple middleware functions for a single route ✅

router
  .route("/:id")
  .get(movieController.getMovie)
  .delete(movieController.deleteMoive)
  .patch(movieController.updateMovie);

module.exports = router;
// route handler function is also a middleware funcion. ✅
