/*
    lec # 4
    How HTTP request and response works?
*/

// step-1 created a simple server.
// step-2 inspect browser Network tab, explore req,res,headers,
// step-3 whenever we type url or ip address of our server in our browser a request send to that url by the browser.
// step-4 in the response browser send data according to the request.

const http = require("http");
const fs = require("fs");
const html = fs.readFileSync("./Template/index.html", "utf-8");

const server = http.createServer((request, response) => {
  console.log("A new request recived...!");
  response.end(html);
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Server has Started! ");
});
