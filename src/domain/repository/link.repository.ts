import { Link } from "../modules/link";
import { CreateLink, CreateLinkRepository } from "./protocols/createLink";
import { FindLinkRepository } from "./protocols/findLink";

import { prisma } from './index'
import { RedisHelper } from "./redis.index";
import { DeleteLinkIfExpiresRepository, DeleteLinkRepository } from "./protocols/deleteLink";

export class LinkRepository implements CreateLinkRepository, FindLinkRepository, DeleteLinkIfExpiresRepository, DeleteLinkRepository {
    async deleteIfExpires(): Promise<void> {
        await prisma.link.deleteMany({
            where: {
                expires: {
                    gte: new Date()
                }
            }
        })
    }
    async create(newLink: CreateLink): Promise<Link> {
        const link = await prisma.link.create({
            data: {
                ...newLink,
                created: new Date()
            }
        })
        RedisHelper.client.set(newLink.urlToken, JSON.stringify(link), {
            EX: 60 * 60 * 24
        })
        return link
    }
    async findByToken(token: string): Promise<Link> {
        const linkInCache = await RedisHelper.client.get(token)
        if (linkInCache) {
            return JSON.parse(linkInCache)
        }
        const link = await prisma.link.findFirst({
            where: {
                urlToken: token
            }
        })

        if (link) {
            RedisHelper.client.set(link.urlToken, JSON.stringify(link))
            return link
        }
        return null
    }
    async deleteLinkById(id: number): Promise<void> {
        const link = await prisma.link.findFirst({ where: { id } })
        await prisma.link.delete({
            where: {
                id
            }
        })
        RedisHelper.client.del(link.urlToken)
    }

}