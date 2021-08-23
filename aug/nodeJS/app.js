// Importing from module.exports

const sayHi = require("./util.js");
// const names = require("./names.js");
const { john, peter } = require("./names.js");

sayHi(john);
sayHi(peter);
