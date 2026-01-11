const fs = require("fs");
const http = require("http");

const html = fs.readFileSync("../frontend/index.html", "utf-8");

const app = http.createServer((request, response) => {
  response.end(html);
});

app.listen(3000, "127.0.0.1", () => {
  console.log("Server is Started!");
  console.log("Node.js on backend Side");
});
