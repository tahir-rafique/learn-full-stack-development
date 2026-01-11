/*
    lec # 12
     Understanding Streams in Practices.
*/
const http = require('http');
const fs = require('fs');


const server = http.createServer();

server.listen(8000, () => {
    console.log('Server has Started!')
})


// Solution:1  Without Readabe OR Writeable Stream ✅ (this is method shouldn't be use in production)

// server.on('request', (request, response) => {

//     fs.readFile('./Files/large-file.txt', 'utf-8', (error, data) => {
//         if (error) {
//             response.end('Something went wrong!');
//             return;
//         }

//         response.end(data)
//     })

// })

// Solution: 2  Using Readabe OR Writeable Stream  ✅✅

server.on('request', (req, res) => {
    let rs = fs.createReadStream('./Files/large-file.txt');

    rs.on('data', (chunk) => {
        res.write(chunk)
    })

    rs.on('end', () => {
        res.end();
    })

    rs.on('error', (error) => {
        res.end(error.message);
    })
})
