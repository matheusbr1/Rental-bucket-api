import { Router } from 'express'
import { CreateAddressController } from '../../../../modules/_address/useCases/createAddress/CreateAddressController'
import { DeleteAddressController } from '../../../../modules/_address/useCases/deleteAddress/DeleteAddressController'

const addressRoutes = Router()

const createAdressController = new CreateAddressController()
const deleteAddressController = new DeleteAddressController()

addressRoutes.post('/address', createAdressController.handle)
addressRoutes.delete('/address/:id', deleteAddressController.handle)

export { addressRoutes }