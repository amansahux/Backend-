const mongoose = require("mongoose");

function connectToDb() {
  mongoose.connect(process.env.MONGOOSE_URI).then(() => {
    console.log("Database is connected");
  });
}

module.exports = connectToDb;
