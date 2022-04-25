import { Router } from 'express'
import { CreateWorkController } from '../../../../modules/works/useCases/createWork/CreateWorkController'
import { CreateWorkTypeController } from '../../../../modules/works/useCases/createWorkType/CreateWorkTypeController'
import { ListWorkController } from '../../../../modules/works/useCases/listWork/listWorkController'
import { ListWorkTypesController } from '../../../../modules/works/useCases/listWorkTypes/ListWorkTypesController'

const workRoutes = Router()

const createWorkTypeController = new CreateWorkTypeController()
const listWorkTypesController = new ListWorkTypesController()

const createWorkController = new CreateWorkController()
const listWorksController = new ListWorkController()

workRoutes.post('/', createWorkController.handle)
workRoutes.get('/', listWorksController.handle)

workRoutes.get('/types', listWorkTypesController.handle)
workRoutes.post('/type', createWorkTypeController.handle)

export { workRoutes }