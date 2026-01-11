const readline = require("readline");

// imported read line module , to read user input form the treminal
//  step:1 we used require() fnc, which will return an Object, then pass module name inside fnc, then store in a variable.

/*
    lec # 1
    readline module, Reading & Writing user input from the terminal.
*/

// step:2 createInterface method needs to pass two property
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//  step:3 question method: take two parameter, 1st prompt message , 2nd callback func.
rl.question("Please Enter your Name:", (name) => {
  console.log("you Entered:", name);
  rl.close(); // close method : to close interface
});

//  step:4  on method : take two parameter : 1st event and 2nd callback function.
rl.on("close", () => {
  console.log("Your interface closed!");
  process.exit(0);
});
