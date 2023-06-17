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

// Define a route to handle user input and save it to Redis
app.post('/users', (req, res) => {
  // ...existing code to save user data to Redis...
});

// Define a route to retrieve all user data from Redis
app.get('/users', (req, res) => {
  // Retrieve all user keys from Redis
  redisClient.keys('user:*', (err, keys) => {
    if (err) {
      console.error('Error retrieving user data from Redis:', err);
      res.status(500).json({ error: 'Error retrieving user data from Redis' });
      return;
    }

    // Fetch user data for each key
    const users = [];
    keys.forEach((key) => {
      redisClient.hgetall(key, (err, userData) => {
        if (err) {
          console.error('Error retrieving user data from Redis:', err);
          res.status(500).json({ error: 'Error retrieving user data from Redis' });
          return;
        }

        users.push(userData);

        // Send the users data as JSON when all user data has been retrieved
        if (users.length === keys.length) {
          res.json(users);
        }
      });
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
