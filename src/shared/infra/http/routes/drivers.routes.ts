import { Router } from 'express'
import { CreateDriverController } from '../../../../modules/drivers/useCases/createDriver/CreateDriverController'
import { DeleteDriverController } from '../../../../modules/drivers/useCases/deleteDriver/DeleteDriverController'
import { DriverDetailController } from '../../../../modules/drivers/useCases/driverDetail/DriverDetailController'
import { ListDriversController } from '../../../../modules/drivers/useCases/listDriver/ListDriversController'
import { UpdateDriverController } from '../../../../modules/drivers/useCases/updateDriver/UpdateDriverController'

const driversRoutes = Router()

const createDriverController = new CreateDriverController()
const listDriversController = new ListDriversController()
const driverDetailController = new DriverDetailController()
const deleteDriverController = new DeleteDriverController()
const updateDriverController = new UpdateDriverController()

driversRoutes.post('/', createDriverController.handle)
driversRoutes.get('/', listDriversController.handle)
driversRoutes.get('/:id', driverDetailController.handle)
driversRoutes.delete('/:id', deleteDriverController.handle)
driversRoutes.put('/:id', updateDriverController.handle)

export { driversRoutes }