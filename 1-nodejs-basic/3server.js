/*
    lec # 3 
    Creating a simple web server.
*/

const http = require("http");
/*   Step - 1 we need 'http' module to create a "server" in node.js  */

/*
    Step - 2
    Create a Server
*/

// callback fnc pass as argument to the c
// callback take 2 parameters ( both act as object ).
//  this callback will be executed every time when a new request hit the server.

const server = http.createServer((request, response) => {
  // to avoid multiple request at first time when server loads.
  if (request.url === "/favicon.ico") {
    response.statusCode = 204; // No content, just avoid sending a favicon
    return response.end();
  }

  console.log("A new request recived...!");
  response.end("Hello World from the Server, Tahir! ");

  // console.log(request);
  // console.log(response);
});

/*
    Step - 3
    Run the Server
*/

//  on the server object we apply listen()
// listen-method() take 3 parameters,
// port number, host (localhost in our case with IP address....),  callback fnc  (3rd is optional )
server.listen(3000, "127.0.0.1", () => {
  console.log("Server has Started! ");
});
