// Import modules
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from a .env file if present

// Create an Express app
const app = express();

// Middleware setup
app.use(morgan("dev")); // Morgan for logging HTTP requests
app.use(cors({ origin: true, credentials: true })); // CORS setup for allowing cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// Connect to MongoDB function
const connectToDatabase = (connectionString) => {
  // Close the existing connection before opening a new one
  mongoose.connection.close();

  mongoose
    .connect(connectionString)
    .then(() => {
      console.log("DB CONNECTED");
      startServer(); // Start the server once the database connection is successful
    })
    .catch((error) => {
      console.log("DB CONNECTION ERROR", error);
    });
};

// Start the server function
const startServer = () => {
  // Start the server
  const port = process.env.PORT || 8080;
  const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

// Routes setup
const eventRoutes = require("./routes/events");
const boardRoutes = require("./routes/boards")

app.use("/api/events", eventRoutes); // Mount event routes under the /api/events path
app.use("/api/boards", boardRoutes);

// Initial connection to the database
connectToDatabase(process.env.MONGO_URI); // Connect to MongoDB using the provided URI

// Export the Express app for testing purposes
module.exports = app;
