import { Request, Response } from "express";
import { ListCustomersUseCase } from "./ListCustomersUseCase";

class ListCustomersCotroller {
  constructor (private listCustomersUseCase: ListCustomersUseCase) {}

  handle(request: Request, response: Response): Response {
    const customers = this.listCustomersUseCase.execute()

    return response.json(customers)
  }
}

export { ListCustomersCotroller }