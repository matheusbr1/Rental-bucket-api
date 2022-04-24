import { Router } from 'express'
import { CreateEquipmentController } from '../../../../modules/trucks/useCases/createEquipment/CreateEquipmentController'
import { createTruckController } from '../../../../modules/trucks/useCases/createTruck'
import { CreateTypeController } from '../../../../modules/trucks/useCases/createType/CreateTypeController'
import { ListEquipmentController } from '../../../../modules/trucks/useCases/listEquipment/ListEquipmentController'
import { listTruksController } from '../../../../modules/trucks/useCases/listTruck'
import { ListTypesController } from '../../../../modules/trucks/useCases/listType/ListTypesController'

const trucksRoutes = Router()

const createEquipmentController = new CreateEquipmentController()
const listEquipmentController = new ListEquipmentController()
const createTypeController = new CreateTypeController()
const listTypeController = new ListTypesController()

trucksRoutes.post('/', (request, response) => {
  return createTruckController.handle(request, response)
})

trucksRoutes.get('/', (request, response) => {
  return listTruksController.handle(request, response)
})

trucksRoutes.post('/types', createTypeController.handle)
trucksRoutes.get('/types', listTypeController.handle)

trucksRoutes.post('/types/equipments', createEquipmentController.handle)
trucksRoutes.get('/types/equipments', listEquipmentController.handle)

export { trucksRoutes }