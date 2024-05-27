import { Router } from "express";
import { CreateCustomerController } from "../../../../modules/customers/useCases/createCustomer/CreateCustomerController";
import { CustomerDetailController } from "../../../../modules/customers/useCases/customerDetail/CustomerDetailController";
import { DeleteCustomerController } from "../../../../modules/customers/useCases/deleteCustomer/DeleteCustomerController";
import { ListCustomersCotroller } from "../../../../modules/customers/useCases/listCustomer/ListCustomersController";
import { UpdateCustomerController } from "../../../../modules/customers/useCases/updateCustomer/UpdateCustomerController";

const customersRoutes = Router()

const createCustomerController = new CreateCustomerController()
const listCustomersController = new ListCustomersCotroller()
const customerDetailController = new CustomerDetailController()
const deleteCustomerController = new DeleteCustomerController()
const updateCustomerController = new UpdateCustomerController()

customersRoutes.post('/', createCustomerController.handle)
customersRoutes.get('/', listCustomersController.handle)
customersRoutes.get('/:id', customerDetailController.handle)
customersRoutes.delete('/:id', deleteCustomerController.handle)
customersRoutes.put('/:id', updateCustomerController.handle)

export { customersRoutes }