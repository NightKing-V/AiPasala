// index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Gateway is running 🎯');
});

// TODO: Route to /agents, /translate, etc.

app.listen(PORT, () => {
  console.log(`API Gateway listening on port ${PORT}`);
});
