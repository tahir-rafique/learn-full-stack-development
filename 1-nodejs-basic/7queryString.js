/*
    lec # 7
     Parsing Query String form URL
*/

const http = require("http");
const fs = require("fs");

// Step-1: import url module
const url = require("url");

const html = fs.readFileSync("./Template/index.html", "utf-8");
let products = JSON.parse(fs.readFileSync("./Data/product.json", "utf-8"));
let productListHtmlPage = fs.readFileSync(
  "./Template/product-list.html",
  "utf-8",
);

let prodHtmlArray = products.map((item) => {
  let output = productListHtmlPage.replace("{{%TITLE%}}", item.title);
  output = output.replace("{{%DESCRIPTION%}}", item.description);
  output = output.replace("{{%BRAND%}}", item.brand);
  output = output.replace("{{%PRICE%}}", item.price);
  output = output.replace("{{%RATING%}}", item.rating);
  output = output.replace("{{%IMAGE%}}", item.thumbnail);
  output = output.replace("{{%ID%}}", item.id);
  return output;
});

const server = http.createServer((request, response) => {
  // Step-2: object destructuring
  let { query, pathname: path } = url.parse(request.url, true);
  // Step-3 we only get the path we store path "alise" to pathname which will get only resourse route from pathanme and store in path

  if (path === "/" || path.toLowerCase() === "/home") {
    response.writeHead(200, {
      "Content-Type": "text/html", // content-type tells what type of content it is.
      "my-header": "Hello Tahir",
    });
    response.end(html.replace("{{%CONTENT%}}", "you are at Home Page."));
  } else if (path.toLowerCase() === "/about") {
    response.writeHead(200, {
      "Content-Type": "text/html",
      "my-header": "Hello Tahir",
    });
    response.end(html.replace("{{%CONTENT%}}", "You are at About Page."));
  } else if (path.toLowerCase() === "/contact") {
    response.writeHead(200, {
      "Content-Type": "text/html",
      "my-header": "Hello Tahir",
    });
    response.end(html.replace("{{%CONTENT%}}", "You are at Contact Page."));
  } else if (path.toLowerCase() === "/products") {
    // Step-4 condictionaly check "query.id" and send "response" accordingly.

    //  if no query.id then display is normal data, else show data of that specific id.
    if (!query.id) {
      let productResponseHtml = html.replace(
        "{{%CONTENT%}}",
        prodHtmlArray.join(","),
      );
      response.writeHead(200, {
        "Content-Type": "text/html",
        "my-header": "Hello, Tahir! we have JSON here.....",
      });
      response.end(productResponseHtml);
    } else {
      response.end("This is the Prod ID:" + query.id);
    }
  } else {
    response.writeHead(404, {
      "Content-Type": "text/html",
      "my-header": "Hello Tahir",
    });
    response.end(html.replace("{{%CONTENT%}}", "404: Page Not Found!"));
  }
});

server.listen(8080, "127.0.0.1", () => {
  console.log("Server has Started! ");
});
