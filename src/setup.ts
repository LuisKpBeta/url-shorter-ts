import express from 'express'
import { linkRouter } from './router/link.router'
import { RedisHelper } from './domain/repository/redis.index'

RedisHelper.connect()

const app = express()

app.use(express.json())
app.use('/', linkRouter)


export default app