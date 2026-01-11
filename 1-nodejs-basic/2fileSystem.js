const fs = require("fs"); //  file system module added/imported

/* 
    lec # 2 
    Reading & Writing to files Synchronously
*/

console.log(`\n \n Reading File Synchronously......`);
const textInps = fs.readFileSync("./Files/input.txt", "utf-8");
console.log(textInps);

let data = `Writing file data using 'fs' module in Node JS Synchronously. ${new Date()}`;
fs.writeFileSync("./Files/output.txt", data);

/* 
    lec # 2 
    Reading & Writing to files Asynchronously
*/

console.log(`\n \n Reading File Asynchronously......`);

// take 3 parameter , path, encoding, callback
fs.readFile("./Files/start.txt", "utf-8", (error1, data) => {
  console.log(data);
  fs.readFile(`./Files/${data}.txt`, "utf-8", (error2, data2) => {
    console.log(data2);
    fs.readFile("./Files/append.txt", "utf-8", (error3, data3) => {
      console.log(data3);
      fs.writeFile(
        "./Files/output.txt",
        `${data2} \n\n ${data3} \n\n ${new Date()}`,
        () => {
          console.log("Files writen Successfully");
        },
      );
    });
  });
});
