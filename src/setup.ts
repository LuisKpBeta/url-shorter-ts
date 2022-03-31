import express from 'express'
import { linkRouter } from './router/link.router'
import { RedisHelper } from './domain/repository/redis.index'
import cron from 'node-cron'
import { deleteOldLinkService } from 'event/deleteOldLinksFactory'
RedisHelper.connect()

cron.schedule('0 0 * * *', async () => {
    await deleteOldLinkService.deleteIfExpires()
});

const app = express()

app.use(express.json())
app.use('/', linkRouter)


export default app