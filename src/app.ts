import express from 'express'
import { router } from './routes'

const app = express()

app.use(express.json())
// app.use(urlencoded({ extended: false }))
app.use(router)

// app.use('/auth', router)

export { app }
