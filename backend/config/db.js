const mongoose = require("mongoose");
// require("dotenv").config({ path: "./config/.env" });

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING, {
      dbName: "vote-app",
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
