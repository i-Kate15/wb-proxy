
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});

app.use(cors());
app.use(express.json());

app.post('/reportDetailByPeriod', async (req, res) => {
  const { dateFrom, dateTo } = req.body;
  const token = req.headers.authorization;

  if (!token || !dateFrom || !dateTo) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  try {
    const response = await fetch(`https://suppliers-api.wildberries.ru/api/v3/supplier/reportDetailByPeriod`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({ dateFrom, dateTo })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('WB Proxy is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
