import express from 'express'

import { routes } from './routes'

const app = express()
app.use(express.json())

app.use('/food/v1', routes)

export { app }