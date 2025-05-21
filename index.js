import express from 'express'
import fetch from 'node-fetch'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.post('/reportDetail', async (req, res) => {
  const { token, dateFrom, dateTo } = req.body

  try {
    const response = await fetch('https://suppliers-api.wildberries.ru/api/v3/supplier/reportDetailByPeriod', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ dateFrom, dateTo })
    })

    const data = await response.json()
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
