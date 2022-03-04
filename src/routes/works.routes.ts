import { Router } from 'express'
import { createWorkController } from '../modules/works/useCases/createWork'
import { listWorkController } from '../modules/works/useCases/listWork'

const workRoutes = Router()

workRoutes.post('/', (request, response) => {
  return createWorkController.handle(request, response)
})

workRoutes.get('/', (request, response) => {
  return listWorkController.handle(request, response)
})

export { workRoutes }