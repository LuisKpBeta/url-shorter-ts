import { Link } from '../../modules/link'
import { FindLinkRepository } from '../../repository/protocols/findLink'
import { GetLinkService } from '../../service/getLink.service'

import MockDate from 'mockdate'
import { DeleteLinkRepository } from 'domain/repository/protocols/deleteLink'

interface Sut {
    sut: GetLinkService,
    findLinkRepository: FindLinkRepository
    deleteLinkById: DeleteLinkRepository
}

const makeLink = (expires = false): Link => {    
    const yesterday = (Date.now() - 1000 * 60 * 60 * 24)
    return {
        id: 0,
        originalUrl: 'any_url',
        urlToken: 'token',
        created: expires ? new Date(yesterday) : new Date(),
        expires: expires ? new Date(yesterday) : new Date()
    }
}
const makeFindLinkRepository = (): FindLinkRepository => {
    class FindLinkRepositoryStub implements FindLinkRepository {
        async findByToken(token: string): Promise<Link> {
            return await Promise.resolve(makeLink())
        }

    }
    return new FindLinkRepositoryStub()
}
const makeDeleteLinkRepository = (): DeleteLinkRepository => {
    class DeleteLinkRepositoryStub implements DeleteLinkRepository {
        deleteLinkById(id: number): Promise<void> {
            return Promise.resolve()
        }
    }
    return new DeleteLinkRepositoryStub()
}
const makeSut = (): Sut => {
    const findLinkRepository = makeFindLinkRepository()
    const deleteLinkById = makeDeleteLinkRepository()
    const sut = new GetLinkService(findLinkRepository, deleteLinkById)
    return { sut, findLinkRepository, deleteLinkById }
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
    test('Should found a link with expired token and return null', async () => {
        const { sut, findLinkRepository } = makeSut()
        const expiredLink = makeLink(true)
        jest.spyOn(findLinkRepository, 'findByToken').mockResolvedValueOnce(expiredLink)
        const link = await sut.get('token')
        expect(link).toBe(null)
    })
    test('Should call deleteLink if expired', async () => {
        const { sut, findLinkRepository, deleteLinkById } = makeSut()
        const expiredLink = makeLink(true)
        jest.spyOn(findLinkRepository, 'findByToken').mockResolvedValueOnce(expiredLink)
        const deleteSpy = jest.spyOn(deleteLinkById, 'deleteLinkById')
        await sut.get('token')
        expect(deleteSpy).toHaveBeenCalledWith(expiredLink.id)
    })
})