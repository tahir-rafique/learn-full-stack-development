const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Movie = reuire('./../Models/movieModel');


dotenv.config({ path: "./config.env" });


// Connect to Databases MongoDB ✅🚀
mongoose.connect(process.env.CONN_STR).then((connection) => {
    console.log('Database Connected Successfully.')
}).catch((error) => {
    console.log('some error has been occur', error)
})

// Read Moive.json file.

