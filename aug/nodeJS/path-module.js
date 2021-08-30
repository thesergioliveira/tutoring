const path = require("path");
// console.log(path);
// console.log(path.sep);

const filePath = path.join("/content", "subfolder", "test.txt");
console.log(filePath);

const myPath = path.resolve("/content");
console.log(` This is the path: ${myPath}`);

const base = path.basename(filePath);
console.log(base);
// console.log(`This is the dirname: ${__dirname}`);
const absolute = path.resolve(__dirname, "content", "subfolder", "text.txt");
console.log(absolute);
