const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    res.json({ message: "Chat endpoint working." });
  } catch (e) {
    res.status(500).json({ error: "Chat failed." });
  }
});

module.exports = router;