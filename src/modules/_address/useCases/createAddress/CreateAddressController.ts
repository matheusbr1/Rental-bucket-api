import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateAddressUseCase } from "./CreateAddressUseCase";
import { instanceToPlain } from "class-transformer";

class CreateAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body

    const createAddressUseCase = container.resolve(CreateAddressUseCase)

    const address = await createAddressUseCase.execute(data)    

    return response.status(201).json(instanceToPlain(address))
  }
}

export { CreateAddressController }
