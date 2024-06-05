const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const { config } = require('dotenv');
const port = 3019; // Adjust port if needed
config();
const app = express();
app.use(express.json());
app.use(express.static("public"));

app.use((req, res, next) => {
  try {
      const publicFolderPath = path.join(process.cwd(), 'public');
      const filePath = path.join(publicFolderPath, req.path);
      const indexPath = path.join(filePath, 'index.html');
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile() || fs.existsSync(indexPath) && fs.statSync(indexPath).isFile()) {
          // File exists in public folder
          res.sendFile(req.path, { root: './public' });
      } else {
          next();
      }
  } catch (e) {
      console.log(e)
      next()
  }
})

app.use(express.urlencoded({ extended: true })); // Parse form data

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


mongoose.connect(process.env.MONGODB_URI) // Ensure correct database name
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    // Handle connection errors appropriately
  });