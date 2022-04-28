import { Request, Response } from "express";
import { container } from "tsyringe";
import { CustomerDetailUseCase } from "./CustomerDetailUseCase";
import { instanceToPlain } from 'class-transformer'

class CustomerDetailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const customerDetailUseCase = container.resolve(CustomerDetailUseCase)

    const customer = await customerDetailUseCase.execute(id)

    return response.json(instanceToPlain(customer))
  }
}

export { CustomerDetailController }