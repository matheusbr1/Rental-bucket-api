import { Router } from 'express'
import { CreateDriverController } from '../../../../modules/drivers/useCases/createDriver/CreateDriverController'
import { DriverDetailController } from '../../../../modules/drivers/useCases/driverDetail/DriverDetailController'
import { ListDriversController } from '../../../../modules/drivers/useCases/listDriver/ListDriversController'
import { CreateAddressController } from '../../../../modules/infos/useCases/createAddress/CreateAddressController'
import { CreateContactController } from '../../../../modules/infos/useCases/createContact/CreateContactController'

const driversRoutes = Router()

const createDriverController = new CreateDriverController()
const listDriversController = new ListDriversController()

const createContactController = new CreateContactController()
const createAdressController = new CreateAddressController()

const driverDetail = new DriverDetailController()

driversRoutes.post('/', createDriverController.handle)
driversRoutes.get('/', listDriversController.handle)

driversRoutes.get('/:id', driverDetail.handle)

driversRoutes.post('/contact', createContactController.handle)
driversRoutes.post('/address', createAdressController.handle)

export { driversRoutes }