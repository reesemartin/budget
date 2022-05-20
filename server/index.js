import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'

import routes from './routes/routes.js'

const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

const app = express()

app.use(express.json())

app.use('/api', routes)

app.listen(3000, () => {
  const port = process.env.PORT ? process.env.PORT : 3000
  console.log(`Server Started at ${port}`)
})
