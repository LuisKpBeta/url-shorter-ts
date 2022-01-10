import { FindLinkController } from './findLink.controller'
import { GetLinkService } from '../../service/getLink.service'
import { LinkRepository } from '../../repository/link.repository'
const repository = new LinkRepository()
const service = new GetLinkService(repository)
const findLinkController = new FindLinkController(service)
export { findLinkController }