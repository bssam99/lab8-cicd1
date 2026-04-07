const express = require('express');
const os      = require('os');
const { MongoClient } = require('mongodb');

const app  = express();
const PORT = 3000;

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DB_NAME   = 'lab8db1';

let db;

MongoClient.connect(MONGO_URL)
  .then(client => {
    db = client.db(DB_NAME);
    console.log('Connected to MongoDB at', MONGO_URL);

    app.listen(PORT, () => {
      console.log('--------------------------------------------------');
      console.log('  CISC 886 Lab 8 — App started');
      console.log(`  Port:  ${PORT}`);
      console.log(`  Host:  ${os.hostname()}`);
      console.log('--------------------------------------------------');
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

app.get('/', (req, res) => {
  res.json({
    app:  'CISC 886 Lab 8',
    host: os.hostname(),
  });
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await db.collection('tasks').find({}).toArray();
    const grouped = tasks.reduce((acc, task) => {
      const key = task.status;
      if (!acc[key]) acc[key] = [];
      acc[key].push({ id: task.id, name: task.name, status: task.status });
      return acc;
    }, {});
    res.json(grouped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});