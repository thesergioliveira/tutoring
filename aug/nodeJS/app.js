// Browser environment (vanilla Javascript, frameworks)
// Module (ES6)
// Local Storage
// DOM - Selectors | Windown(events)
//Virtual DOM React - Hooks

// Nodejs (v8 engine) - CommonJS
// Brave, Edge
// CLI (command line interface -terminal )

// __dirname - file name
// file System
const { readFileSync, writeFileSync } = require("fs");
const data = readFileSync("./content/text.txt", { encoding: "UTF8" });
console.log(data);

// Desktop (Electron)
// os
const os = require("os");
const user = os.userInfo();
const currentOs = {
  name: os.type(),
  release: os.release(),
  totalMen: os.totalmem(),
  freeMen: os.freemem(),
};
console.table(currentOs);
// Server application
// http

const names = require("./name.js");
// file system
// Try and Catch - Handling errors.
// try{

// } catch (err)
// Async await - Use whenever you want to not delay the code for the rest of the application (YOU DON'T WANNA GET STUCK!).
// Promise - Formal request. Where you define the step after receiving the response or catching errors.
// .then()
//
const { readFile, writeFile } = require("fs");
const SayHi = require("./function.js");
require("./function.js");

readFile("./content/test.txt", "utf8", (err, result) => {
  if (err) {
    console.log(`This is the err: ${err}`);
    return;
  }
  console.log(result);
});
console.log(names.name1);

SayHi(names.name1);
