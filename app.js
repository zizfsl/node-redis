const express = require('express');
const redis = require('redis');
const path = require('path');

// Create an Express app
const app = express();
const port = 3000; // Update with your desired port

// Connect to Redis
const redisClient = redis.createClient();

// Set up Express middleware to parse request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve the frontend HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Define a route to handle user input and save it to Redis
app.post('/users', (req, res) => {
  const { name, age, email, city } = req.body;

  // Save user data to Redis
  redisClient.hmset('user', ['Name', name, 'Age', age, 'Email', email, 'City', city], (err) => {
    if (err) {
      console.error('Error saving user data to Redis:', err);
      res.status(500).send('Error saving user data to Redis');
    } else {
      console.log('User data saved to Redis');
      res.send('User data saved to Redis');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
