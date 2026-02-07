require("dotenv").config();
const app = require("./src/app");
const connectDb = require("./src/config/database")

app.listen(3000, () => {
  console.log("Server started at port 3000");
});

connectDb();