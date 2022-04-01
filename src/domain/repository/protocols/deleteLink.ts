export interface DeleteLinkIfExpiresRepository{
    deleteIfExpires():Promise<void>
}

export interface DeleteLinkRepository{
    deleteLinkById(id: number):Promise<void>
}