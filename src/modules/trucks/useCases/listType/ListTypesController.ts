import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListTypesUseCase } from "./ListTypesUseCase";
import { instanceToPlain } from 'class-transformer'

class ListTypesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listTypesUseCase = container.resolve(ListTypesUseCase)

    const truckTypes = await listTypesUseCase.execute()

    return response.json(instanceToPlain(truckTypes))
  }
}

export { ListTypesController }