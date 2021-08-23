// GLOBALS -No window

// __dirname - path to current directory
// __filename - file name
// require - function to use modules
// module - info about current module(file)
// process - info about env where the program is being executed

console.log(__dirname);

// setInterval(()=>{
//     console.log("hello world")
// }, 1000)

// Simple function

const names = require("./names");
// console.log(names);
const sayHi = (name) => {
  console.log(`Hello there ${name}`);
};

// CommonJS, every file is module (by default)
// Modules - Encapsulated code (only share minimum)
module.exports = sayHi;
// console.log(module);
