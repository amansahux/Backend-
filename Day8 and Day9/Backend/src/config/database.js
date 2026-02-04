const mongoose = require("mongoose");

function connectToDb() {
  mongoose.connect(process.env.MONGOO_URI).then(() => {
    console.log("Database connected successfully");
  });
}
module.exports = connectToDb;
