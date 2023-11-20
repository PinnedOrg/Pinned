// import modules
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
// require("dotenv").config();

// app
const app = express();

//db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
    const server = app.listen(port, () =>
      console.log(`Server is running on port ${port}`)
    );
  })
  .catch((error) => console.log("DB CONNECTION ERROR", error));

//middleware
app.use(morgan("dev"));
app.use(cors({ orgin: true, credentials: true }));

//routes
const eventRoutes = require("./routes/event");
app.use("/", eventRoutes);

// port
const port = process.env.PORT || 8080;
