const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://vvsgk:Password@cluster0.6uolb.mongodb.net/bank', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Define Mongoose Schema
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
}, { collection: 'icici' });

const Transaction = mongoose.model('Transaction', transactionSchema);

// API to get all transactions
app.get('/api/transactions', async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ TransactionDate: -1 }).limit(10);
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API to get balance (latest transaction balance)
app.get('/api/balance', async (req, res) => {
    try {
        const latestTransaction = await Transaction.findOne().sort({ TransactionDate: -1 });
        res.json({ balance: latestTransaction ? latestTransaction.Balance : 0 });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API to get graph data
app.get('/api/graph-data', async (req, res) => {
    try {
        const graphData = await Transaction.find().sort({ TransactionDate: 1 }).limit(30);
        const formattedData = graphData.map(txn => ({
            date: txn.TransactionDate.toISOString().split('T')[0],
            value: txn.Balance
        }));
        res.json(formattedData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});