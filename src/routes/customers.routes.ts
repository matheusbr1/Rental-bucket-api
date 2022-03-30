import { Router } from "express";
import { createCustomerController } from "../modules/customers/useCases/createCustomer";
import { listCustomersCotroller } from "../modules/customers/useCases/listCustomer";

const customersRoutes = Router()

customersRoutes.post('/', (request, response) => {
  return createCustomerController.handle(request, response)
}) 

customersRoutes.get('/', (request, response) => {
  return listCustomersCotroller.handle(request, response)
}) 

export { customersRoutes }