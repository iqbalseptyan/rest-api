const app = require("./app");
const db = require("./api/config/config");

db.authenticate()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
