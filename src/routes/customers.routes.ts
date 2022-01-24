import { Router } from "express";
import { createCustomerController } from "../modules/costumers/useCases/createCustomer";
import { listCustomersCotroller } from "../modules/costumers/useCases/listCustomer";

const customersRoutes = Router()

customersRoutes.post('/', (request, response) => {
  return createCustomerController.handle(request, response)
}) 

customersRoutes.get('/', (request, response) => {
  return listCustomersCotroller.handle(request, response)
}) 

export { customersRoutes }