import { Router } from 'express'
import { CreateWorkController } from '../../../../modules/works/useCases/createWork/CreateWorkController'
import { CreateWorkTypeController } from '../../../../modules/works/useCases/createWorkType/CreateWorkTypeController'
import { DeleteWorkController } from '../../../../modules/works/useCases/deleteWork/DeleteWorkController'
import { ListWorkController } from '../../../../modules/works/useCases/listWork/listWorkController'
import { ListWorkTypesController } from '../../../../modules/works/useCases/listWorkTypes/ListWorkTypesController'
import { UpdateWorkController } from '../../../../modules/works/useCases/updateWork/UpdateWorkController'
import { WorkDetailController } from '../../../../modules/works/useCases/workDetail/WorkDetailController'
import { PlaceBucketController } from '../../../../modules/works/useCases/placeBucket/PlaceBucketController'
import { RemoveBucketController } from '../../../../modules/works/useCases/removeBucket/RemoveBucketController'
import { CancelWorkController } from '../../../../modules/works/useCases/cancelWork/CancelWorkController'

// Work

const workRoutes = Router()

const createWorkController = new CreateWorkController()
const listWorksController = new ListWorkController()

const workDetailController = new WorkDetailController()
const deleteWorkController = new DeleteWorkController()
const updateWorkController = new UpdateWorkController()

// Fluxo do serviço
const placeBucketController = new PlaceBucketController()
const removeBucketController = new RemoveBucketController()
const cancelWorkController = new CancelWorkController()

workRoutes.post('/', createWorkController.handle)
workRoutes.get('/', listWorksController.handle)
workRoutes.get('/:id', workDetailController.handle)
workRoutes.delete('/:id', deleteWorkController.handle)
workRoutes.put('/:id', updateWorkController.handle)

workRoutes.post('/place-bucket/:id', placeBucketController.handle)
workRoutes.post('/remove-bucket/:id', removeBucketController.handle)
workRoutes.post('/cancel/:id', cancelWorkController.handle)

const workTypesRoutes = Router()

const createWorkTypeController = new CreateWorkTypeController()
const listWorkTypesController = new ListWorkTypesController()

workTypesRoutes.get('/', listWorkTypesController.handle)
workTypesRoutes.post('/', createWorkTypeController.handle)

export { workRoutes, workTypesRoutes }