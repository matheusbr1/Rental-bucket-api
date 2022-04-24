import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { CreateTypeUseCase } from "./CreateTypeUseCase";

class CreateTypeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body

    const createTypeUseCase = container.resolve(CreateTypeUseCase)

    const truckType = await createTypeUseCase.execute({ name, description })

    return response.status(201).send(truckType)
  }
}

export { CreateTypeController }