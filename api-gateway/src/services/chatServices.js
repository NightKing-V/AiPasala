const axios = require('axios');

async function chatText(chatid, text) {
  const { response } = await axios.post('http://agents:5000/chat', {
    chatid, text
  });
  return response;
}

module.exports = { chatText };
