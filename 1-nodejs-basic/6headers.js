/*
    lec # 6
     Setting up header and place-holder in JS.
*/

const http = require("http");
const fs = require("fs");
const html = fs.readFileSync("./Template/index.html", "utf-8");
let products = JSON.parse(fs.readFileSync("./Data/product.json", "utf-8"));
let productListHtmlPage = fs.readFileSync(
  "./Template/product-list.html",
  "utf-8",
);

//  we map the data and replce in product-list-html page and store in another variable
let prodHtmlArray = products.map((item) => {
  let output = productListHtmlPage.replace("{{%TITLE%}}", item.title);
  output = output.replace("{{%DESCRIPTION%}}", item.description);
  output = output.replace("{{%BRAND%}}", item.brand);
  output = output.replace("{{%PRICE%}}", item.price);
  output = output.replace("{{%RATING%}}", item.rating);
  output = output.replace("{{%IMAGE%}}", item.thumbnail);
  return output;
});

const server = http.createServer((request, response) => {
  let path = request.url;
  if (path === "/" || path.toLowerCase() === "/home") {
    //  Step-1 : write head before "Response.end" method
    //  Step-2 : in Write-head, first send Status-Code, then 2nd argument will be headers object,
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
    let productResponseHtml = html.replace(
      "{{%CONTENT%}}",
      prodHtmlArray.join(","),
    );
    response.writeHead(200, {
      "Content-Type": "text/html",
      "my-header": "Hello, Tahir! we have JSON here.....",
    });
    response.end(productResponseHtml);
    // console.log(productResponseHtml);
  } else {
    response.writeHead(404, {
      "Content-Type": "text/html",
      "my-header": "Hello Tahir",
    });
    response.end(html.replace("{{%CONTENT%}}", "404: Page Not Found!"));
  }
});

server.listen(5000, "127.0.0.1", () => {
  console.log("Server has Started! ");
});
