import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCustomersUseCase } from "./ListCustomersUseCase";
import { instanceToPlain } from "class-transformer";

class ListCustomersCotroller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { company_id } = request.query

    const listCustomersUseCase = container.resolve(ListCustomersUseCase)

    const customers = await listCustomersUseCase.execute(company_id as string)

    return response.json(instanceToPlain(customers))
  }
}

export { ListCustomersCotroller }