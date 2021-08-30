const http = require("http");
const server = http.createServer((req, res) => {
  res.write("welcome to our home page");
  res.end();
});

server.listen(8080, () => {
  console.log("The server is online");
});
