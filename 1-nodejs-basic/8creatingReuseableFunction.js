/*
    lec # 8
     Creating a reuseable function.
*/

const http = require("http");
const fs = require("fs");
const url = require("url");

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

//  Step-1 : create a function with values that we want to resue.
function replaceHtml(template, product) {
  let output = template.replace("{{%IMAGE%}}", product.productImage);
  output = output.replace("{{%NAME%}}", product.name);
  output = output.replace("{{%MODELNAME%}}", product.modeName);
  output = output.replace("{{%MODELNO%}}", product.modelNumber);
  output = output.replace("{{%SIZE%}}", product.size);
  output = output.replace("{{%CAMERA%}}", product.camera);
  output = output.replace("{{%PRICE%}}", product.price);
  output = output.replace("{{%COLOR%}}", product.color);
  output = output.replace("{{%ID%}}", product.id);
  output = output.replace("{{%ROM%}}", product.ROM);
  output = output.replace("{{%DESC%}}", product.Description);

  return output;
}

const server = http.createServer((request, response) => {
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
    //  Step-2 : use that func where you need the same functionality or data.

    if (!query.id) {
      let prodHtmlArray = products.map((prod) => {
        //  Step-2 : e.g
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
      let prodId = products[query.id];
      // this  will return us product based on the id property form our json data.
      // then we store it in a variable.

      //  Step-2 : e.g

      let productDetailsResponseHtml = replaceHtml(
        productDetailsHtmlPage,
        prodId,
      );

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

server.listen(8080, "127.0.0.1", () => {
  console.log("Server has Started! ");
});
