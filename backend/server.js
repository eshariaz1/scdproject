const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Direct MongoDB connection with your URI
const mongoURI = "mongodb+srv://esha:esha123@cluster0.ypvzn.mongodb.net/scdproject?retryWrites=true&w=majority";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

// Task model with collection name 'scdproject'
const Task = mongoose.model('Task', new mongoose.Schema({
  task: { type: String, required: true }
}), 'scdproject');  // This ensures it uses the 'scdproject' collection

// API Routes
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const newTask = new Task({ task: req.body.task });
  await newTask.save();
  res.status(201).json(newTask);
});

app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(200).send('Task deleted');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
