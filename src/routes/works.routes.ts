import { Router } from 'express'
import { createWorkController } from '../modules/works/useCases/createWork'

const workRoutes = Router()

workRoutes.post('/', (request, response) => {
  return createWorkController.handle(request, response)
})

export { workRoutes }