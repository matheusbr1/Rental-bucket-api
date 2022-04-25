import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListWorkTypesUseCase } from "./ListWorkTypesUseCase";

class ListWorkTypesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listWorkTypesUseCase = container.resolve(ListWorkTypesUseCase)

    const workTypes = await listWorkTypesUseCase.execute()

    return response.json(workTypes)
  }
}

export { ListWorkTypesController }