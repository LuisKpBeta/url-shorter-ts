import app from '../../../setup'
import config from '../../../config'
import { prisma } from '../../repository/index'
import request from 'supertest'
import MockDate from 'mockdate'
import { Link } from 'domain/modules/link'

const insertLink = async (): Promise<Link> => {
    const ONE_DAY = 1000 * 60 * 60 * 24
    const link = await prisma.link.create({
        data: {
            originalUrl: "https://www.google.com/",
            urlToken: 'AAAAAAA',
            expires: new Date(Date.now() + ONE_DAY),
            created: new Date()
        }
    })
    return link
}

describe('Find Link Controller', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })
    beforeEach(async () => {
        await prisma.link.deleteMany()
    })
    afterAll(() => {
        MockDate.reset()
    })
    test('ensure route redirect to link if token exists', async () => {
        const myLink = await insertLink()
        const response = await request(app).get(`/${myLink.urlToken}`)
        expect(response.headers['location']).toBe(myLink.originalUrl)
    })
    test('ensure route returns 404 if token not exists', async () => {
        const response = await request(app).get(`/AAAAAAA`)
        expect(response.status).toBe(404)
    })
})