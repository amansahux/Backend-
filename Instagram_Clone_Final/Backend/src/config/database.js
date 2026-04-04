const mongoose = require("mongoose");
const ConnectToDb = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to Database");
};
module.exports = ConnectToDb;
