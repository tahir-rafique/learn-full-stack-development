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


//  We are reading data as stream but still here is  problem.
//  let say our readable-stream is reading the data at 4mbps
//  and our writeable-stream is writing the data at 3mbps
//  so here one is faster and other is slower
//  this will overwhelm the writeable stream which can not handle all that incoming data so fast
//  this problem is called back pressure.
//  this problem happens when response can not send the data nearly as fast as it recieve file.

//  so comment the below code.

// Solution: 2  Using Readabe OR Writeable Stream  ✅✅

// server.on('request', (req, res) => {
//     let rs = fs.createReadStream('./Files/large-file.txt');

//     rs.on('data', (chunk) => {
//         res.write(chunk)
//     })

//     rs.on('end', () => {
//         res.end();
//     })

//     rs.on('error', (error) => {
//         res.end(error.message);
//     })
// })


// Solution: 3  Using pipe method  ✅✅✅

//  pipe method is only use for readable streams not writeable streams.
//  when we use pipe method it will fix back-pressure.  
server.on('request', (req, response) => {
    let rs = fs.createReadStream('./Files/large-file.txt');
    rs.pipe(response)
    //redableSource.pipe(writableDest)
})
