import { Link } from '../../modules/link'
import { CreateLink, CreateLinkRepository } from '../../repository/protocols/createLink'
import { CreateLinkService } from '../../service/createLink.service'

import MockDate from 'mockdate'
import crypto from 'crypto'

interface Sut {
    sut: CreateLinkService,
    createLinkRespository: CreateLinkRepository
}

const makeRepository = (): CreateLinkRepository => {
    class CreateLinkRepositoryStub implements CreateLinkRepository {
        async create(newLink: CreateLink): Promise<Link> {
            const link = {
                ...newLink,
                id: 'any_id',
                created: new Date()
            }
            return await Promise.resolve(link)
        }
    }
    return new CreateLinkRepositoryStub()
}
const makeSut = (): Sut => {
    const createLinkRespository = makeRepository()
    const sut = new CreateLinkService(createLinkRespository)
    return { sut, createLinkRespository }
}

describe('Create Link', () => {
    beforeAll(() => {
        MockDate.set(new Date())
        jest.spyOn(crypto, 'randomBytes').mockImplementation(() => 'token')
    })
    afterAll(() => {
        MockDate.reset()
    })

    test('Should create a link with success', async () => {
        const { sut } = makeSut()
        const link = await sut.create('link')
        expect(link.id).toBe('any_id')
        expect(link.originalUrl).toBe('link')
        expect(link.urlToken).toBe('token')
    })
    test('Should call repository with new link data', async () => {
        const { sut, createLinkRespository } = makeSut()
        const createSpy = jest.spyOn(createLinkRespository, 'create')
        const link = await sut.create('link')
        const tomorrow = Date.now() + sut.ONE_DAY
        const newLinkData = {
            originalUrl: 'link',
            urlToken:'token',
            expires: new Date(tomorrow)
        }
        expect(createSpy).toHaveBeenCalledWith(newLinkData)
    })
})