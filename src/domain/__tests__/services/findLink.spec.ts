import { Link } from '../../modules/link'
import { FindLinkRepository } from '../../repository/protocols/findLink'
import { GetLinkService } from '../../service/getLink.service'

import MockDate from 'mockdate'
import crypto from 'crypto'

interface Sut {
    sut: GetLinkService,
    findLinkRepository: FindLinkRepository
}

const makeLink = ():Link => ({
    id:0,
    originalUrl: 'any_url',
    urlToken: 'token',
    created: new Date(),
    expires: new Date()
})
const makeRepository = (): FindLinkRepository => {
    class FindLinkRepositoryStub implements FindLinkRepository {
        async findByToken(token: string): Promise<Link> {
            return await Promise.resolve(makeLink())
        }
        
    }
    return new FindLinkRepositoryStub()
}
const makeSut = (): Sut => {
    const findLinkRepository = makeRepository()
    const sut = new GetLinkService(findLinkRepository)
    return { sut, findLinkRepository }
}

describe('Create Link', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })
    afterAll(() => {
        MockDate.reset()
    })

    test('Should found a link with token', async () => {
        const { sut } = makeSut()
        const link = await sut.get('token')
        expect(link.id).toBe(0)
        expect(link.originalUrl).toBe('any_url')
        expect(link.urlToken).toBe('token')
    })
    test('Should return null if link not exists', async () => {
        const { sut, findLinkRepository } = makeSut()
        jest.spyOn(findLinkRepository, 'findByToken').mockResolvedValueOnce(null)
        const link = await sut.get('token')
        expect(link).toBeNull()
    })
    test('Should call repository with link token', async () => {
        const { sut, findLinkRepository } = makeSut()
        const findToken = jest.spyOn(findLinkRepository, 'findByToken')
        await sut.get('token')
        expect(findToken).toHaveBeenCalledWith('token')
    })
})