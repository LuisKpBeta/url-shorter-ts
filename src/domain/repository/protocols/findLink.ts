import { Link } from "../../modules/link";

export interface FindLinkRepository {
    findByToken(token:string):Promise<Link>
}