/*
    lec # 11
     Emitting and Handling Custom Events
*/

// Core modules
const http = require("http");
const fs = require("fs");
const url = require("url");

// step-1 import module
// const events = require("events");
const user = require('./Modules/user')

// Custom Modules - User Defined Modules
const replaceHtml = require("./Modules/replaceHtml");

// Third-Party Modules/Libraries

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

// step-2 :  events module give us a event emiiter class, here we create instance of that class, and store in a variable

//  on the events variable, we have EventEmitter class to create an instance of this event emitter class we need to call it Constructor.

// let myEmitter = new events.EventEmitter();
let myEmitter = new user(); // now my emitter is instance of user class


//  step-4: listen on that raised event using on() method

// we can pass  arguments to the call-back attached to the event-listener.
myEmitter.on('userCreated', (id, name) => {
    console.log(`A new User ${ name }  with ID ${ id } is created!`)
})

//  on the same events we can listen multiple times and exectue different logic.
myEmitter.on('userCreated', (id, name) => {
    console.log(`A new User ${ name }  with ID ${ id } is added to Database.`)
})

// step-3 :  instance par emit() method apply kea, so from here we can raise named events, here we emitted the event
// step-3 should be after step-4 emit method should always after the event-listener and handler.

// step-5 we can added event data with event emit
myEmitter.emit('userCreated', 101, 'tahir');
