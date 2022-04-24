import { Router } from "express";
import { CreateCustomerController } from "../../../../modules/customers/useCases/createCustomer/CreateCustomerController";
import { ListCustomersCotroller } from "../../../../modules/customers/useCases/listCustomer/ListCustomersController";

const customersRoutes = Router()

const createCustomerController = new CreateCustomerController()
const listCustomersController = new ListCustomersCotroller()

customersRoutes.post('/', createCustomerController.handle) 
customersRoutes.get('/', listCustomersController.handle) 

export { customersRoutes }