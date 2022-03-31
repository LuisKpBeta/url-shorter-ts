export interface DeleteLinkIfExpiresRepository{
    deleteIfExpires():Promise<void>
}