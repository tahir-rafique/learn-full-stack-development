// A Simple Script file to import data into MongoDB database. run this file using CLI
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const fs = require('fs');

const Movie = require('../Models/movieModel');

dotenv.config({ path: "./config.env" });



// Connect to Databases ✅🚀
mongoose.connect(process.env.CONN_STR).then((connection) => {
    // console.log(connection);
    console.log('Database Connected Successfully.')
}).catch((error) => {
    console.log('some error has been occur', error)
})


// Read file moives.json
const movies = JSON.parse(fs.readFileSync('./data/movies.json', 'utf-8'));


// 1st: Delete all the Existing movie documents from Collection

const deleteMovies = async () => {
    try {
        await Movie.deleteMany();
        console.log('Movies Collection deleted Successfully.')
    } catch (error) {
        console.log(error.message);
    }

    process.exit();
}

// 2nd: Import movies data to MongoDB Collection

const importMovies = async () => {
    try {
        await Movie.create(movies);
        console.log('Movies Imported to the Collection Successfully.')
    } catch (error) {
        console.log(error.message);
    }
    process.exit();
}

if (process.argv[2] === '--import') {
    importMovies();
}

if (process.argv[2] === '--delete') {
    deleteMovies();
}
