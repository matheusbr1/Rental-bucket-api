import { Router } from 'express'
import { CreateEquipmentController } from '../../../../modules/trucks/useCases/createEquipment/CreateEquipmentController'
import { createTruckController } from '../../../../modules/trucks/useCases/createTruck'
import { createTypeController } from '../../../../modules/trucks/useCases/createType'
import { listTruksController } from '../../../../modules/trucks/useCases/listTruck'
import { listTypesController } from '../../../../modules/trucks/useCases/listType'

const trucksRoutes = Router()

const createEquipmentController = new CreateEquipmentController()

trucksRoutes.post('/', (request, response) => {
  return createTruckController.handle(request, response)
})

trucksRoutes.get('/', (request, response) => {
  return listTruksController.handle(request, response)
})

trucksRoutes.post('/types', (request, response) => {
  return createTypeController.handle(request, response)
})

trucksRoutes.get('/types', (request, response) => {
  return listTypesController.handle(request, response)
})

trucksRoutes.post('/types/equipments', createEquipmentController.handle)

export { trucksRoutes }