const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConfig = require('./config/database.config.js');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Define Transaction schema
const transactionSchema = new mongoose.Schema({
  TransactionID: String,
  TransactionDate: Date,
  TransactionType: String,
  Amount: Number,
  Currency: String,
  AccountID: String,
  Source: String,
  Destination: String,
  Status: String,
  ReferenceNumber: String,
  Description: String,
  Balance: Number
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// Routes
app.get('/api/transactions', async (req, res) => {
  const transactions = await Transaction.find();
  res.json(transactions);
});

app.get('/api/balance', async (req, res) => {
  const latestTransaction = await Transaction.findOne().sort({ TransactionDate: -1 });
  res.json({ balance: latestTransaction ? latestTransaction.Balance : 0 });
});

// New route for graph data
app.get('/api/graph-data', async (req, res) => {
  const mockData = [
    { date: "Mar", value: 300 },
    { date: "Apr", value: 350 },
    { date: "May", value: 200 },
    { date: "Jun", value: 400 },
    { date: "Jul", value: 300 },
    { date: "Aug", value: 200 },
    { date: "Sep", value: 450 },
    { date: "Oct", value: 500 },
    { date: "Nov", value: 480 },
    { date: "Dec", value: 400 },
    { date: "Jan", value: 350 },
    { date: "Feb", value: 400 },
  ];
  res.json(mockData);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});