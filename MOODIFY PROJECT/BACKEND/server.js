require("dotenv").config();
const app = require("./src/app");
const connectToDb = require("./src/config/databse");
app.listen(3000, () => {
  console.log("Server is started at port 3000");
});

connectToDb();
