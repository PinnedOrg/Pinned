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
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
app.use(cors({ orgin: true, credentials: true })); // enabling express server to respond to preflight requests
app.use(express.json()); // setup middleware for application

//routes
const eventRoutes = require("./routes/events");
app.use("/api/events", eventRoutes);

// port
const port = process.env.PORT || 8080;
