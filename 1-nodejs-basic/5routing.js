/*
    lec # 5
    Implement Routing in backend-application Node.JS?
*/

const http = require("http");
const fs = require("fs");
const html = fs.readFileSync("./Template/index.html", "utf-8");

const server = http.createServer((request, response) => {
  console.log(request.url);
  //  root URL ky after wala "resource" print kary ga.

  // Step-1 : get request Routes
  let path = request.url;

  //  Step-2 : implement routing on the basis of "resources"
  //  Step-3 : Condictionally we sended  different responses  for different pages.

  if (path === "/" || path.toLocaleLowerCase() === "/home") {
    response.end(html.replace("{{%CONTENT%}}", "You are at Home Page."));
  } else if (path.toLocaleLowerCase() === "/about") {
    response.writeHead(200);
    response.end(html.replace("{{%CONTENT%}}", "You are at About Page."));
  } else if (path.toLocaleLowerCase() === "/contact") {
    response.writeHead(200);
    response.end(html.replace("{{%CONTENT%}}", "You are at Contact Page."));
  } else if (path.toLocaleLowerCase() === "/products") {
    response.writeHead(200);
    response.end(html.replace("{{%CONTENT%}}", "You are at Products Page."));
  } else {
    response.writeHead(404);
    response.end(html.replace("{{%CONTENT%}}", "404: Page Not Found!"));
  }
});

server.listen(5000, "127.0.0.1", () => {
  console.log("Server has Started! ");
});
