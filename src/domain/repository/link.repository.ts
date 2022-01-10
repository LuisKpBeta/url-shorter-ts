import { Link } from "../modules/link";
import { CreateLink, CreateLinkRepository } from "./protocols/createLink";
import { FindLinkRepository } from "./protocols/findLink";

import { prisma } from './index'

export class LinkRepository implements CreateLinkRepository, FindLinkRepository {
    async create(newLink: CreateLink): Promise<Link> {
        const link = await prisma.link.create({
            data:{
                ...newLink,
                created: new Date()
            }
        })
        return link
    }
    async findByToken(token: string): Promise<Link> {
        const link = await prisma.link.findFirst({
            where:{
                urlToken:token
            }
        })
        return link || null
    }

}