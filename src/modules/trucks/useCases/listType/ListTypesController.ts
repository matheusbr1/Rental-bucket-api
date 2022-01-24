import { Request, Response } from "express";
import { ListTypesUseCase } from "./ListTypesUseCase";

class ListTypesController {
  constructor(private listTypesUseCase: ListTypesUseCase) {}

  handle(request: Request, response: Response): Response {
    const types = this.listTypesUseCase.execute()

    return response.json(types)
  }
}

export { ListTypesController }