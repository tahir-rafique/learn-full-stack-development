//  Route Handlers / Controllers ✅  Business Logic for Movie Resource

const Movie = require("../Models/movieModel")


exports.getAllMovies = async (req, res) => {
  try {
    // query parameters ✅
    // console.log(req.query);

    /*

    //  Mongoose 6.6 or less this will work

     const exclueField = ['page', 'limit', 'sort', 'fields'];
     const queryObj = { ...req.query };
    
     exclueField.forEach(el => delete queryObj[el]);

     const movies = await Movie.find(queryObj);
    
    */

    // console.log(req.query);

    // let queryStr = JSON.stringify(req.query); // convert obj to string
    // //  regular expression 1st argument, 2nd argument is the value with which we want to replace it callback fnc ()=>{}
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => {
    //   return `$${match}`
    // })
    // const queryObj =JSON.parse(queryStr); // convert string to js object.
    // console.log(queryObj);

    // const movies = await Movie.find(queryObj);

    // ✅ Use this EXACT logic (works 100%)

    const excludeFields = ['sort', 'page', 'limit', 'fields'];
    const queryObj = {};

    for (const key in req.query) {
      // Skip excluded fields - don't add them to queryObj
      if (excludeFields.includes(key)) continue;

      if (key.includes('[')) {
        // duration[gte] → duration, gte
        const field = key.split('[')[0];
        const operator = key.match(/\[(.*)\]/)[1];

        if (!queryObj[field]) queryObj[field] = {};
        queryObj[field][`$${operator}`] = Number(req.query[key]);
      } else {
        queryObj[key] = req.query[key];
      }
    }

    // console.log(queryObj);

    // Build the query
    let query = Movie.find(queryObj);

    // SORTING LOGIC ✅🚀

    // Apply sorting if sort parameter exists
    if (req.query.sort) {
      // Handle multiple sort fields: ?sort=price,rating
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('createdAt'); // new moives at the top always initailly (at starting)
    }



    // LIMITING FIELDS ✅🚀
    if (req.query.fields) {
      //  select is query method, only can be use on query object

      // query.select('name duration price ratings');
      // Here in above line of code we are sperating fields using " " space butt
      /* 
       In the req we are sperating using "," comma 
       req:  http://localhost:3000/api/v1/movies/fields=name,duration,price,ratings
      */

      const fields = req.query.fields.split(',').join(' ');

      // this expression returns us array till split then we join the array elements using join method.
      console.log(fields);
      query = query.select(fields);


    } else {
      query = query.select('-__v'); // return full document by default & exclude the fields that start with __ using the minus sign (-)
      //  we can not do both exclusion and inclusion at same time.
    }


    // Execute the query
    const movies = await query;


    // this find({  name:'tahir',   age:{$gte:18}  }) method is filtering object.
    // gte = greator then or equal to,
    //  this above filter

    // mongoose special methods
    // const movies = await Movie.find()
    //   .where('duration').gte(req.query.duration)
    //   .where('rating').gte(req.query.rating)
    //   .where('price').lte(req.query.price);

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
