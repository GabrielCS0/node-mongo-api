import express from 'express'

const app = express()

app.get('/', (req, res) => {
  return res.json({ message: 'Hello, World!' })
})

app.listen(5000, () => console.log('Server is Running!'))
