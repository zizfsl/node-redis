const express = require('express');
const redis = require('redis');
const path = require('path');

// Create an Express app
const app = express();
const port = 3001; // Update with your desired port

// Connect to Redis
const redisClient = redis.createClient();

// Set up Express middleware to parse request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve the frontend HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend.html'));
});

// Define a route to retrieve user data from Redis
app.get('/users', (req, res) => {
  redisClient.hgetall('user', (err, userData) => {
    if (err) {
      console.error('Error retrieving user data from Redis:', err);
      res.status(500).json({ error: 'Error retrieving user data from Redis' });
    } else {
      res.json(userData);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
