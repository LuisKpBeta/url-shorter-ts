import { Request, Response } from 'express'
import { CreateLinkService } from '../../service/createLink.service'
import config from '../../../config'
export class CreateUrlController {
    constructor(private readonly createLinkService: CreateLinkService) { }
    async handle(request: Request, response: Response): Promise<Response> {
        const { link } = request.body
        try {
            const newLink = await this.createLinkService.create(link)
            newLink.urlToken = config.SERVER_NAME + newLink.urlToken
            return response.json({ link: { ...newLink } })
        } catch (error) {
            return response.status(500).json({ error: error.message })
        }
    }
}