import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCustomersUseCase } from "./ListCustomersUseCase";
import { instanceToPlain } from "class-transformer";

class ListCustomersCotroller {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCustomersUseCase = container.resolve(ListCustomersUseCase)

    const customers = await listCustomersUseCase.execute()

    return response.json(instanceToPlain(customers))
  }
}

export { ListCustomersCotroller }