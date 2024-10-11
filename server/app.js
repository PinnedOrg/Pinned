const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { connectToDatabase } = require('./database/db'); 
require('dotenv').config(); // Load environment variables

const app = express();

// Middleware setup
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Routes setup
const eventRoutes = require('./routes/events');
const clubRoutes = require('./routes/clubs');
const userRoutes = require('./routes/users');
const reviewRoutes = require('./routes/reviews');
const { createClerkClient } = require('@clerk/backend');

app.use('/api/events', eventRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

app.get('/find', (req, res) => {
  const clerkId = req.query.id;
  const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
  console.log(process.env.CLERK_SECRET_KEY);
  clerk.users.getUser(clerkId)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

const startServer = () => {
  const port = process.env.PORT || 8080;
  const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

// Use environment variable directly in the call
connectToDatabase(process.env.MONGO_URI)
  .then(() => {
    console.log('DB CONNECTED');
    startServer();
  })
  .catch((error) => {
    console.log('DB CONNECTION ERROR', error);
  });

module.exports = app;
