require("dotenv").config();
const app = require("./src/app");
const connectDb = require("./src/config/database");
connectDb();

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
