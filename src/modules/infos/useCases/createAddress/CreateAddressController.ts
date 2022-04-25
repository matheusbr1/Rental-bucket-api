import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateAddressUseCase } from "./CreateAddressUseCase";

class CreateAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body

    const createCustumerAddressUseCase = container.resolve(CreateAddressUseCase)

    const address = await createCustumerAddressUseCase.execute(data)    

    return response.status(201).json(address)
  }
}

export { CreateAddressController }
