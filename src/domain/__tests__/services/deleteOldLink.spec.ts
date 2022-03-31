import { DeleteLinkIfExpiresRepository } from '../../repository/protocols/deleteLink'
import { DeleteOldLinkService } from '../../service/deleteOldLink.service'

import MockDate from 'mockdate'
import crypto from 'crypto'


interface Sut {
    sut: DeleteOldLinkService,
    deleteLinkRespository: DeleteLinkIfExpiresRepository
}

const makeRepository = (): DeleteLinkIfExpiresRepository => {
    class DeleteLinkIfExpiresRepositoryStub implements DeleteLinkIfExpiresRepository {
        async deleteIfExpires(): Promise<void> {
            return Promise.resolve()
        }
        
    }
    return new DeleteLinkIfExpiresRepositoryStub()
}
const makeSut = (): Sut => {
    const deleteLinkRespository = makeRepository()
    const sut = new DeleteOldLinkService(deleteLinkRespository)
    return { sut, deleteLinkRespository }
}

describe('Delete Link if expires', () => {
    beforeAll(() => {
        MockDate.set(new Date())
        jest.spyOn(crypto, 'randomBytes').mockImplementation(() => 'token')
    })
    afterAll(() => {
        MockDate.reset()
    })
    test('Should call repository with new link data', async () => {
        const { sut, deleteLinkRespository } = makeSut()
        const createSpy = jest.spyOn(deleteLinkRespository, 'deleteIfExpires')
        await sut.deleteIfExpires()
        expect(createSpy).toHaveBeenCalledWith()
    })
})