import { Router } from 'express'
import { createUrlController } from '../domain/controllers/createLink'
import { findLinkController } from '../domain/controllers/findLink'
const linkRouter = Router()

linkRouter.get('/:token', (req, res) => findLinkController.handle(req, res))
linkRouter.post('/link/', (req, res) => createUrlController.handle(req, res))


export { linkRouter }