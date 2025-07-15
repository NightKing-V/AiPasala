const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/chat', require('./routes/chat'));
app.use('/upload', require('./routes/upload'));
app.use('/sahana', require('./routes/sahana'));

// Root
app.get('/', (req, res) => {
  res.send('AI Pasala Gateway Running 🚀');
});

app.listen(PORT, () => {
  console.log(`🚀 Gateway running on http://localhost:${PORT}`);
});
