//  Everything related to application/Server node.js and DB connection should be here........

//  application setup here only......

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
  console.log('some error has been occur', error)
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Your backend is running at port ${PORT}`);
});
