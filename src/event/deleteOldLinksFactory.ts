import { LinkRepository } from 'domain/repository/link.repository'
import { DeleteOldLinkService } from '../domain/service/deleteOldLink.service'

const DeleteLinkIfExpiresRepository = new LinkRepository()
const deleteOldLinkService = new DeleteOldLinkService(DeleteLinkIfExpiresRepository)

export { deleteOldLinkService }