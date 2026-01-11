const fs = require("fs");
const http = require("http");

const html = fs.readFileSync("./index.html", "utf-8");
let productsData = JSON.parse(fs.readFileSync("../Data/product.json", "utf-8"));
const productListHtml = fs.readFileSync("./product-list.html", "utf-8");

let prodHtmlArray = productsData.map((item) => {
  let output = productListHtml.replace("{{%IMAGE%}}", item.thmbnail);
  output.replace("{{%TITLE%}}", item.title);
  output.replace("{{%DESCRIPTION%}}", item.title);
  output.replace("{{%BRAND%}}", item.title);
  output.replace("{{%PRICE%}}", item.title);

  return output;
});

const app = http.createServer((request, response) => {
  // response.end(html);
  let path = request.url;
  // response.end(path);

  //   Routing
  if (path === "/" || path.toLocaleLowerCase() === "/home") {
    response.writeHead(200, {
      "Content-Type": "text/html",
      "custom-header": "hello Tahir",
    });
    response.end(html.replace(" {{%CONTENT%}} ", "you are in Home Page."));
  } else if (path.toLocaleLowerCase() === "/about") {
    response.writeHead(200, {
      "Content-Type": "text/html",
      "my-header": "hello world",
    });
    response.end(html.replace(" {{%CONTENT%}} ", "you are in About Page."));
  } else if (path.toLocaleLowerCase() === "/contact") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(html.replace(" {{%CONTENT%}} ", "you are in Contact Page."));
  } else if (path.toLocaleLowerCase() === "/products") {
    response.writeHead(200, {
      "Content-Type": "application/json",
      "custom-header": "This is json data static.",
    });

    response.end("yor are prod page");
    console.log(prodHtmlArray);
  } else {
    response.writeHead(404, {
      "Content-Type": "text/html",
      "custom-header": "hello world",
    });
    response.end(html.replace(" {{%CONTENT%}} ", "Error: 404 Page not found!"));
  }
});

const PORT = 9000;

app.listen(PORT, "127.0.0.1", () => {
  console.log("Server is Stared...!");
});
