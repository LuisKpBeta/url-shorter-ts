import { Link } from "../modules/link";
import { FindLinkRepository } from "../repository/protocols/findLink";

export class GetLinkService {
    constructor(private readonly findLinkRepository: FindLinkRepository){}
    async get(linkToken:string):Promise<Link> {
        const token = await this.findLinkRepository.findByToken(linkToken)
        return token
    }
}