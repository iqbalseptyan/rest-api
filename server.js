const http = require("http");
const app = require("./app");
const db = require("./api/config/config");

db.authenticate()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`server running on port ${port}`);
});
