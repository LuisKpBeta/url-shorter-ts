import express from 'express'
import { linkRouter } from './router/link.router'

const app = express()

app.use(express.json())
app.use('/', linkRouter)

app.listen(3030)