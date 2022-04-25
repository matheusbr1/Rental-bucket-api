import { Router } from 'express'
import { createWorkController } from '../../../../modules/works/useCases/createWork'
import { CreateWorkTypeController } from '../../../../modules/works/useCases/createWorkType/CreateWorkTypeController'
import { listWorkController } from '../../../../modules/works/useCases/listWork'
import { ListWorkTypesController } from '../../../../modules/works/useCases/listWorkTypes/ListWorkTypesController'

const workRoutes = Router()

const createWorkTypeController = new CreateWorkTypeController()
const listWorkTypesController = new ListWorkTypesController()

workRoutes.post('/', (request, response) => {
  return createWorkController.handle(request, response)
})

workRoutes.get('/', (request, response) => {
  return listWorkController.handle(request, response)
})

workRoutes.get('/types', listWorkTypesController.handle)
workRoutes.post('/type', createWorkTypeController.handle)

export { workRoutes }