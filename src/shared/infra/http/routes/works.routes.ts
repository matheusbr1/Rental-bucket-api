import { Router } from 'express'
import { WorksRepository } from '../../../../modules/works/infra/typeorm/repositories/WorksRepository'
import { CompleteWorkController } from '../../../../modules/works/useCases/completeWork/CompleteWorkController'
import { CreateWorkController } from '../../../../modules/works/useCases/createWork/CreateWorkController'
import { CreateWorkTypeController } from '../../../../modules/works/useCases/createWorkType/CreateWorkTypeController'
import { DeleteWorkController } from '../../../../modules/works/useCases/deleteWork/DeleteWorkController'
import { ListWorkController } from '../../../../modules/works/useCases/listWork/listWorkController'
import { ListWorkTypesController } from '../../../../modules/works/useCases/listWorkTypes/ListWorkTypesController'
import { UpdateWorkController } from '../../../../modules/works/useCases/updateWork/UpdateWorkController'
import { WorkDetailController } from '../../../../modules/works/useCases/workDetail/WorkDetailController'

// Work

const workRoutes = Router()

const createWorkController = new CreateWorkController()
const listWorksController = new ListWorkController()

const workDetailController = new WorkDetailController()
const deleteWorkController = new DeleteWorkController()
const updateWorkController = new UpdateWorkController()
const completeWorkController = new CompleteWorkController()

workRoutes.post('/', createWorkController.handle)
workRoutes.get('/', listWorksController.handle)
workRoutes.get('/:id', workDetailController.handle)
workRoutes.delete('/:id', deleteWorkController.handle)
workRoutes.put('/:id', updateWorkController.handle)
workRoutes.patch('/complete/:id', completeWorkController.handle)

// Work Types

const workTypesRoutes = Router()

const createWorkTypeController = new CreateWorkTypeController()
const listWorkTypesController = new ListWorkTypesController()

workTypesRoutes.get('/', listWorkTypesController.handle)
workTypesRoutes.post('/', createWorkTypeController.handle)

export { workRoutes, workTypesRoutes }