import { Link } from '../../modules/link'

export interface CreateLink {
    originalUrl: string,
    urlToken:string,
    expires: Date
}

export interface CreateLinkRepository {
    create(newLink: CreateLink): Promise<Link>
}

