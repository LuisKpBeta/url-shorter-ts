import { Link } from "../modules/link";
import { FindLinkRepository } from "../repository/protocols/findLink";
import { DeleteLinkRepository } from "../repository/protocols/deleteLink";

export class GetLinkService {
    constructor(
        private readonly findLinkRepository: FindLinkRepository,
        private readonly deleteLinkRepository: DeleteLinkRepository
        ){}
    async get(linkToken:string):Promise<Link> {
        const token = await this.findLinkRepository.findByToken(linkToken)
        if(token){
            const tokenExpired = new Date(token.expires) < new Date()
            if(tokenExpired){
                await this.deleteLinkRepository.deleteLinkById(token.id)
                return null
            }
            return token
        }
        return  null
    }
}