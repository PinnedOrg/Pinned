// import modules
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

// app
const app = express();

//db connecting with mongoose
mongoose
  .connect(process.env.MONGO_URI)
  // listening to incoming requests from the port in usage
  .then(() => {
    console.log("DB CONNECTED");
    const server = app.listen(port, () =>
      console.log(`Server is running on port ${port}`)
    );
  })
  .catch((error) => console.log("DB CONNECTION ERROR", error));

//middleware
app.use(morgan("dev")); // gives concise output colored by response status
app.use(cors({ origin: true, credentials: true })); // enabling express server to respond to preflight requests
app.use(express.json()); // setup middleware for application

//routes
const eventRoutes = require("./routes/events");
const boardRoutes = require("./routes/boards")

app.use("/api/events", eventRoutes);
app.use("/api/boards", boardRoutes);

// port
const port = process.env.PORT || 8080;
