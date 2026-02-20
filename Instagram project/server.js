require("dotenv").config();
const app = require("./src/app");
const connectTOoDb = require("./src/config/database")

app.listen(3000, () => {
  console.log("server started at port 3000");
});

connectTOoDb()