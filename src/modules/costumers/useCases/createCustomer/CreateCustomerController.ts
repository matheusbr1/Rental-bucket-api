import { Request, Response } from "express";
import { CreateCustomerUseCase } from "./CreateCustomerUseCase";

class CreateDriverController {
  constructor (private createCustomerUseCase: CreateCustomerUseCase) {}

  handle(request: Request, response: Response): Response {
    const data = request.body

    this.createCustomerUseCase.execute(data)

    return response.status(201).send()
  }
}

export { CreateDriverController }