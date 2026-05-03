const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/election_db';

mongoose.set('debug', true);
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        initializeData();
    })
    .catch(err => console.log('MongoDB connection error:', err));

const electionSchema = new mongoose.Schema({
    keralaTotal: { type: Number, default: 20 },
    keralaSubtotal: { type: Number, default: 20 },
    ldf: { type: Number, default: 5 },
    udf: { type: Number, default: 14 },
    nda: { type: Number, default: 1 },
    lastUpdated: { type: Date, default: Date.now }
});

const ElectionData = mongoose.model('ElectionData', electionSchema);

// Initial data setup if none exists
const initializeData = async () => {
    const data = await ElectionData.findOne();
    if (!data) {
        await ElectionData.create({});
        console.log('Initial election data created');
    }
};
// initializeData(); // Moved to .then() above

app.get('/health', (req, res) => {
    res.json({ status: 'ok', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

app.get('/api/data', async (req, res) => {
    try {
        const data = await ElectionData.findOne();
        res.json(data || {});
    } catch (err) {
        console.error('GET Error:', err);
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/data', async (req, res) => {
    console.log('Received data update:', req.body);
    try {
        const { keralaTotal, keralaSubtotal, ldf, udf, nda } = req.body;
        const data = await ElectionData.findOneAndUpdate(
            {},
            { keralaTotal, keralaSubtotal, ldf, udf, nda, lastUpdated: Date.now() },
            { new: true, upsert: true }
        );
        console.log('Update successful');
        res.json(data);
    } catch (err) {
        console.error('POST Error:', err);
        res.status(500).json({ message: err.message });
    }
});

// Serve Static Files (Production)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
