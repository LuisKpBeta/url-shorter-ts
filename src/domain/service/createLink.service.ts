import crypto from 'crypto'

import { Link } from "../modules/link";
import { CreateLink, CreateLinkRepository } from "../repository/protocols/createLink";

export class CreateLinkService{
    ONE_DAY = 1000 * 60 * 60 * 24
    constructor(private readonly createLinkRepository: CreateLinkRepository){}
    async create(newUrl: string):Promise<Link>{
        const linkToken = this.generateToken()
        const expires = Date.now() + this.ONE_DAY
        const newLink:CreateLink = {
            originalUrl: newUrl,
            urlToken:linkToken,
            expires: new Date(expires)
        }
        const link = await this.createLinkRepository.create(newLink)
        return link
    }

    private generateToken():string{
        const newToken = crypto.randomBytes(8).toString('hex')
        return newToken
    }
}   