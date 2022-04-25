import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCustomerAddressUseCase } from "./CreateCustomerAddressUseCase";

class CreateCustomerAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body

    const createCustumerAddressUseCase = container.resolve(CreateCustomerAddressUseCase)

    const address = await createCustumerAddressUseCase.execute(data)    

    return response.status(201).json(address)
  }
}

export { CreateCustomerAddressController }
