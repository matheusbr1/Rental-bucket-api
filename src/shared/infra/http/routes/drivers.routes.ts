import { Router } from 'express'
import { CreateDriverController } from '../../../../modules/drivers/useCases/createDriver/CreateDriverController'
import { DeleteDriverController } from '../../../../modules/drivers/useCases/deleteDriver/DeleteDriverController'
import { DriverDetailController } from '../../../../modules/drivers/useCases/driverDetail/DriverDetailController'
import { ListDriversController } from '../../../../modules/drivers/useCases/listDriver/ListDriversController'
import { CreateAddressController } from '../../../../modules/infos/useCases/createAddress/CreateAddressController'
import { CreateContactController } from '../../../../modules/infos/useCases/createContact/CreateContactController'
import { DeleteAddressController } from '../../../../modules/infos/useCases/deleteAddress/DeleteAddressController'
import { DeleteContactController } from '../../../../modules/infos/useCases/deleteContact/DeleteContactController'

const driversRoutes = Router()

const createDriverController = new CreateDriverController()
const listDriversController = new ListDriversController()

const createContactController = new CreateContactController()
const deleteContactController = new DeleteContactController()

const createAdressController = new CreateAddressController()
const deleteAddressController = new DeleteAddressController()

const driverDetailController = new DriverDetailController()
const deleteDriverController = new DeleteDriverController()

driversRoutes.post('/', createDriverController.handle)
driversRoutes.get('/', listDriversController.handle)

driversRoutes.get('/:id', driverDetailController.handle)
driversRoutes.delete('/:id', deleteDriverController.handle)

driversRoutes.post('/contact', createContactController.handle)
driversRoutes.delete('/contact/:id', deleteContactController.handle)

driversRoutes.post('/address', createAdressController.handle)
driversRoutes.delete('/address/:id', deleteAddressController.handle)

export { driversRoutes }