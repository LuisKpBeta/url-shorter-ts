import app from '../../../setup'
import config from '../../../config'
import { prisma } from '../../repository/index'
import request from 'supertest'
import MockDate from 'mockdate'

describe('Create Link Controller', () => {
    beforeAll(async () => {
        MockDate.set(new Date())
        await prisma.link.deleteMany()
    })
    afterAll(() => {
        MockDate.reset()
    })
    test('ensure route can create a link correctly', async () => {
        const response = await request(app).post('/link').send({ link: 'https://www.google.com/' })
        const { link } = response.body
        expect(link.id).not.toBeNull()
        expect(new Date(link.created)).toEqual(new Date())
        expect(link.urlToken).toContain(config.SERVER_NAME)
    })
})