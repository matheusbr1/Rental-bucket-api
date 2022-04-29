import { Router } from 'express'
import { CreateEquipmentController } from '../../../../modules/trucks/useCases/createEquipment/CreateEquipmentController'
import { CreateTruckController } from '../../../../modules/trucks/useCases/createTruck/CreateTruckController'
import { CreateTypeController } from '../../../../modules/trucks/useCases/createType/CreateTypeController'
import { DeleteTruckController } from '../../../../modules/trucks/useCases/deleteTruck/DeleteTruckController'
import { ListEquipmentController } from '../../../../modules/trucks/useCases/listEquipment/ListEquipmentController'
import { ListTrucksController } from '../../../../modules/trucks/useCases/listTruck/ListTrucksController'
import { ListTypesController } from '../../../../modules/trucks/useCases/listType/ListTypesController'
import { TruckDetailController } from '../../../../modules/trucks/useCases/truckDetail/TruckDetailController'

// Trucks

const trucksRoutes = Router()

const createTruckController = new CreateTruckController()
const listTruckController = new ListTrucksController()
const truckDetailController = new TruckDetailController()
const deleteTruckController = new DeleteTruckController()

trucksRoutes.post('/', createTruckController.handle)
trucksRoutes.get('/', listTruckController.handle)
trucksRoutes.get('/:id', truckDetailController.handle)
trucksRoutes.delete('/:id', deleteTruckController.handle)

// Truck Types

const truckTypesRoutes = Router()

const createTypeController = new CreateTypeController()
const listTypeController = new ListTypesController()

truckTypesRoutes.post('/', createTypeController.handle)
truckTypesRoutes.get('/', listTypeController.handle)

const createEquipmentController = new CreateEquipmentController()
const listEquipmentController = new ListEquipmentController()

truckTypesRoutes.post('/equipments', createEquipmentController.handle)
truckTypesRoutes.get('/equipments', listEquipmentController.handle)

export { trucksRoutes, truckTypesRoutes }