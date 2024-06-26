const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Could not connect to the database. Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
