/*
    lec # 10
     Event Drivent Architecture
*/

const http = require("http");
const fs = require("fs");
const url = require("url");

const replaceHtml = require("./Modules/replaceHtml");

const html = fs.readFileSync("./Template/index.html", "utf-8");
let products = JSON.parse(fs.readFileSync("./Data/product.json", "utf-8"));
let productListHtmlPage = fs.readFileSync(
  "./Template/product-list.html",
  "utf-8",
);
let productDetailsHtmlPage = fs.readFileSync(
  "./Template/products-details.html",
  "utf-8",
);

// const server = http.createServer((request, response) => {
// });

const server = http.createServer();

server.on("request", (request, response) => {
  let { query, pathname: path } = url.parse(request.url, true);

  if (path === "/" || path.toLowerCase() === "/home") {
    response.writeHead(200, {
      "Content-Type": "text/html",
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
    if (!query.id) {
      let prodHtmlArray = products.map((prod) => {
        return replaceHtml(productListHtmlPage, prod);
      });
      let productResponseHtml = html.replace(
        "{{%CONTENT%}}",
        prodHtmlArray.join(""),
      );
      response.writeHead(200, {
        "Content-Type": "text/html",
        "my-header": "Hello, Tahir! we have JSON here.....",
      });
      response.end(productResponseHtml);
    } else {
      // Single-Product details
      let prodId = products[query.id];
      let productDetailsResponseHtml = replaceHtml(
        productDetailsHtmlPage,
        prodId,
      );
      response.writeHead(200, {
        "Content-Type": "text/html",
        "my-header":
          "This is the details of single product which fetch by product-ID",
      });
      response.end(html.replace("{{%CONTENT%}}", productDetailsResponseHtml));
    }
  } else {
    response.writeHead(404, {
      "Content-Type": "text/html",
      "my-header": "Hello Tahir",
    });
    response.end(html.replace("{{%CONTENT%}}", "404: Page Not Found!"));
  }
});

server.listen(8000, () => {
  console.log("Server has Started! ");
});
