import { CreateUrlController } from './createLink.controller'
import { CreateLinkService } from '../../service/createLink.service'
import { LinkRepository } from '../../repository/link.repository'
const repository = new LinkRepository()
const createService = new CreateLinkService(repository)
const createUrlController = new CreateUrlController(createService)

export { createUrlController }