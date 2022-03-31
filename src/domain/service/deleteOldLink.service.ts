import { DeleteLinkIfExpiresRepository } from "domain/repository/protocols/deleteLink";

export class DeleteOldLinkService {
    constructor(private readonly linkRepository: DeleteLinkIfExpiresRepository){}

    async deleteIfExpires(){
        await this.linkRepository.deleteIfExpires()
    }
}