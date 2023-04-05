const mongoose = require("mongoose");

const dbConnect = () => {
  try {
    const connection = mongoose.connect(process.env.MONGO_URI);
    console.log("db connected........");
  } catch (err) {
    throw new Error("database error");
  }
};

module.exports = dbConnect;
