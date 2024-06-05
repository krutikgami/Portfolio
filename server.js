const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const port = 3019; // Adjust port if needed

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true })); // Parse form data
mongoose.connect('mongodb://127.0.0.1:27017/formdata2') // Ensure correct database name
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    // Handle connection errors appropriately
  });

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true // Make Name field mandatory
  },
  email: {
    type: String,
    required: true // Make email field mandatory
  },
  Message: {
    type: String,
    required: true // Make Message field mandatory
  }
});

const User = mongoose.model('User', userSchema); // Use 'User' instead of 'users'

app.post('/submit-form', async (req, res) => {
  const { Name, email, Message } = req.body; // Destructure form data

  try {
    const newUser = await User.create({ Name, email, Message });
    console.log('User saved successfully:', newUser); // Log saved user data for debugging

    res.send('Form submitted successfully!'); // Send response to HTML
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).send('Error submitting form'); // Handle errors
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
