/*
    lec # 13
     Event Loop in NodeJs practice 
*/

const fs = require('fs')

console.log('Program has started.');
//  execute in Main-thread of NodeJs.

//  STORED In 1st-Phase Event-Loop
// setTimeout(() => {
//     console.log('Timer callback executed');
// }, 0);
//  this timer fnc will execute in 1st-phase (timer-phase) of event loop.
//  the callback attact to this timer fun will get stored in Callback-Queue of 1st-Phase of event loop.


// STORED In 2nd-Phase Event-Loop ( IO TASK)
fs.readFile('./Files/input.txt', () => {
    console.log('File read completed');

    // STORED In 1st-Phase Event-Loop
    setTimeout(() => {
        console.log('Timer callback executed')
    }, 0);

    //  STORED In 3rd-Phase Event-Loop
    setImmediate(() => {
        console.log('SetImmediate callback executed')
    })

    //  know order will change

    process.nextTick(() => { console.log('Process.nextTick callback executed ') })
})


//  STORED In 3rd-Phase Event-Loop
// setImmediate(() => {
//     console.log('SetImmediate callback executed')
// })

//  there is bug in  nodeJs documentation that ( setImmdiate should expire always before then any other timer) which in not true in many cases, e.g like in our. This is a known bug. 🐛❌🐛❌

console.log('Program has completed ');
