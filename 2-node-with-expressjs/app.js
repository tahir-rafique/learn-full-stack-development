//  IMPORT PACKAGE 
const express = require('express');
//  require returns a function which we store  in a variable named "epxress"

let app = express();
// when we call express fnc, it returns an object, so let's go ahead and let's store that object in a variable.
//  this app has bunch of methods which we can use in our nodeJs application.

// HANDLE ROUTES
//  ROUTE = HTTP METHOD + URL
app.get('/', (request, response) => {
    // response.status(200).send(`<h4>Hello form express server</h4>`);
    // chaning huii edr 2 method kee, aur status always 1st, then send method.
    //  when we use send method content type of send() method is text/html bydefault.
    //  it will not work for json.
    //  for sending json response we use json() method instead of send();
    response.status(200).json({ message: 'Hello world, This is json response', status: 200 });
    //  when we use json method content type will be application/json
});

app.post('/', () => {
    console.log('hello jee post method')
})
// CREATE A SERVER  
const PORT = 4000;
app.listen(PORT, () => {
    console.log('Server has started');
})