import { createClient } from 'redis'


export const RedisHelper = {
    client: createClient({ url: process.env.REDIS_URL }),
    async connect():Promise<void>{
        this.client.on('error', (err) => console.log('Redis Client Error', err));
        await this.client.connect()
    }
}
