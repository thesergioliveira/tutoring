/*
Built-in Modules

OS
PATH
FS
HTTP

Further documentation on the modules that Node.js offers: https://nodejs.org/dist/latest-v14.x/docs/api/
*/

const { readFile, writeFile } = require("fs");
readFile("./content/first.txt", (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(result);
});
