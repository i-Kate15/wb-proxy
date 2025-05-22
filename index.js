const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/reportDetailByPeriod', async (req, res) => {
  try {
    const { dateFrom, dateTo } = req.body;
    const token = process.env.WB_API_KEY;

    const response = await axios.post(
      'https://statistics-api.wildberries.ru/api/v1/supplier/reportDetailByPeriod',
      { dateFrom, dateTo },
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server with CORS running on port ${PORT}`);
});