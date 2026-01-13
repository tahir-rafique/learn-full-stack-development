let http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello World! Tahir');
}).listen(8080);

console.log('Backend Server Started!')