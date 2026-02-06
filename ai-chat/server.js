require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
// Allow overriding the Claude model via env; default to a widely available one.
const CLAUDE_MODEL = process.env.CLAUDE_MODEL || 'claude-3-haiku-20240307';

if (!CLAUDE_API_KEY) {
  console.warn('Warning: CLAUDE_API_KEY is not set. /api/ask will return an error until it is configured.');
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/ask', async (req, res) => {
  const { question } = req.body || {};

  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'A question string is required.' });
  }

  if (!CLAUDE_API_KEY) {
    return res.status(500).json({ error: 'Server is not configured with CLAUDE_API_KEY.' });
  }

  try {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: CLAUDE_MODEL,
        max_tokens: 512,
        temperature: 0.7,
        system: 'You are a concise, helpful assistant for a simple demo web app.',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: question,
              },
            ],
          },
        ],
      },
      {
        headers: {
          'x-api-key': CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
      }
    );

    const textContent =
      response.data &&
      Array.isArray(response.data.content) &&
      response.data.content[0] &&
      response.data.content[0].type === 'text'
        ? response.data.content[0].text
        : '';

    const answer = typeof textContent === 'string' ? textContent.trim() : '';

    res.json({ answer });
  } catch (err) {
    console.error('Error calling Claude:', err.response?.data || err.message || err);
    res.status(500).json({ error: 'Error while calling AI service.' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// module.exports = app;