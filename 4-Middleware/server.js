//  Everything related to application/Server node.js and DB connection should be here........

//  application setup here only

// const os = require('os');
// console.log(os.platform());

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

// console.log(app.get("env"));
// console.log(process.env);


// Connect to Databases ✅🚀
mongoose.connect(process.env.CONN_STR).then((connection) => {
  // console.log(connection);
  console.log('Database Connected Successfully.')
}).catch((error) => {
  console.log('some error has been occur')
})


//  Schema 
const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name feild is required!'],
    unique: true,
  },
  description: String,
  duration: {
    type: Number,
    required: [true, 'Duration feild is required!']
  },
  rating:
  {
    type: Number,
    default: 1.0
  }
});

// model 
// collection name, Schema
// model name Must start with Capital letter.
const Movie = mongoose.model('Movie', movieSchema);

// mdoel to: ---------> create document
const testMovie = new Movie({
  name: 'Love Guru',
  description: 'love guru description............',
  rating: 5.0,
  duration:150,
});

//  send doc to database
testMovie.save().then((doc) => {
  console.log(doc);
}).catch((error) => {
  console.log(`Error Message: ${error}`)
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Your backend is running at port ${PORT}`);
});
