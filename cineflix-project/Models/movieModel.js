const mongoose = require("mongoose");

//  Schema 

// limiting fields  
// we can also exclue the fields form schema, if the password should never be exposed to the client, and
//  that can be done in the schema
const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name feild is required!'],
        unique: true,
        trim: true, // make sure no white-space before and after the movie name.
    },
    description: {
        type: String,
        required: [true, 'Description feild is required!'],
        trim: true,
    },
    duration: {
        type: Number,
        required: [true, 'Duration feild is required!']
    },
    rating:
    {
        type: Number,
    },
    totalRating: {
        type: Number
    },
    releaseYear: {
        type: Number,
        required: [true, 'Release year feild is required!']
    },
    releaseDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false, // simple that will hide this field.
    },
    geners: {
        type: [String],
        required: [true, "Gener is requried field!"]
    },
    directors: {
        type: [String],
        required: [true, "Director is requried field!"]
    },
    coverImage: {
        type: String,
        required: [true, "Image is requried field!"]
    },
    actors: {
        type: [String],
        required: [true, "Actors is requried field!"]
    },
    price: {
        type: Number,
        required: [true, "Price is requried field!"]
    }

});

// model 
// collection name, Schema
// model name Must start with Capital letter.
const Movie = mongoose.model('Movie', movieSchema);

// expot the model
module.exports = Movie;
