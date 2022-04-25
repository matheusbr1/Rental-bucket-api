import { Router } from "express";
import { CreateCustomerController } from "../../../../modules/customers/useCases/createCustomer/CreateCustomerController";
import { CreateCustomerAddressController } from "../../../../modules/customers/useCases/createCustomerAddress/CreateCustomerAddressController";
import { CreateCustomerContactController } from "../../../../modules/customers/useCases/createCustomerContact/CreateCustomerContactController";
import { ListCustomersCotroller } from "../../../../modules/customers/useCases/listCustomer/ListCustomersController";

const customersRoutes = Router()

const createCustomerController = new CreateCustomerController()
const listCustomersController = new ListCustomersCotroller()

const createCustomerContactController = new CreateCustomerContactController()
const createCustomerAddressController = new CreateCustomerAddressController()

customersRoutes.post('/', createCustomerController.handle) 
customersRoutes.get('/', listCustomersController.handle)

customersRoutes.post('/contact', createCustomerContactController.handle)
customersRoutes.post('/address', createCustomerAddressController.handle)

export { customersRoutes }