require("dotenv").config();
const http = require("http");
const app = require("./app");

server = http.createServer(app);
const PORT = process.env.PORT || 8000;
server.listen(PORT, () =>
  console.log(`The server is up and running on http://localhost:${PORT}/home`)
);
