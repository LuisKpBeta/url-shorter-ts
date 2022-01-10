import { Request, Response } from 'express'
import { GetLinkService } from '../../service/getLink.service'

export class FindLinkController {
    constructor(private readonly getLinkService: GetLinkService) { }
    async handle(request: Request, response: Response): Promise<void | Response> {
        const { token } = request.params
        const link = await this.getLinkService.get(token)
        if (!link) {
            return response.status(404).send()
        }
        return response.redirect(link.originalUrl)

    }
}