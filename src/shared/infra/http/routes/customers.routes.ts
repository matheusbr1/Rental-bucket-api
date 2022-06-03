import { Router } from "express";
import { CreateCustomerController } from "../../../../modules/customers/useCases/createCustomer/CreateCustomerController";
import { CustomerDetailController } from "../../../../modules/customers/useCases/customerDetail/CustomerDetailController";
import { DeleteCustomerController } from "../../../../modules/customers/useCases/deleteCustomer/DeleteCustomerController";
import { ListCustomersCotroller } from "../../../../modules/customers/useCases/listCustomer/ListCustomersController";
import { UpdateCustomerController } from "../../../../modules/customers/useCases/updateCustomer/UpdateCustomerController";
import { CreateAddressController } from "../../../../modules/infos/useCases/createAddress/CreateAddressController";
import { CreateContactController } from "../../../../modules/infos/useCases/createContact/CreateContactController";

const customersRoutes = Router()

const createCustomerController = new CreateCustomerController()
const listCustomersController = new ListCustomersCotroller()

const createContactController = new CreateContactController()
const createAdressController = new CreateAddressController()

const customerDetailController = new CustomerDetailController()
const deleteCustomerController = new DeleteCustomerController()
const updateCustomerController = new UpdateCustomerController()

customersRoutes.post('/', createCustomerController.handle) 
customersRoutes.get('/', listCustomersController.handle)

customersRoutes.get('/:id', customerDetailController.handle)
customersRoutes.delete('/:id', deleteCustomerController.handle)
customersRoutes.put('/:id', updateCustomerController.handle)

customersRoutes.post('/contact', createContactController.handle)
customersRoutes.post('/address', createAdressController.handle)

export { customersRoutes }