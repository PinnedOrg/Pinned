const mongoose = require("mongoose");
require("dotenv").config();

const connectToDatabase = (connectionString) => {
  return mongoose.connect(connectionString);
};

// Export the connect function and mongoose instance
module.exports = {
  connectToDatabase
};
