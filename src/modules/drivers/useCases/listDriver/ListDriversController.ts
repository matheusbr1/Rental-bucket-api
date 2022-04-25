import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListDriversUseCase } from "./ListDriversUseCase";
import { instanceToPlain } from "class-transformer";

class ListDriversController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listDriverUseCase = container.resolve(ListDriversUseCase)

    const drivers = await listDriverUseCase.execute()

    return response.json(instanceToPlain(drivers))
  }
}

export { ListDriversController }