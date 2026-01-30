require("dotenv").config();
const app = require("./src/app");

const mongoose = require("mongoose");
function connectToDb() {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("server connected to database");
  });
}
connectToDb();

app.listen(3000, () => {
  console.log("server is started on port 3000");
});

// require("dotenv").config(); // MUST be first

// const app = require("./src/app");
// const mongoose = require("mongoose");

// async function connectToDb() {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log("database connected");
//   } catch (error) {
//     console.error("database connection failed", error);
//     process.exit(1); // kill app if DB fails
//   }
// }

// connectToDb();

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`server started on port ${PORT}`);
// });
