import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListDriversUseCase } from "./ListDriversUseCase";
import { instanceToPlain } from "class-transformer";

class ListDriversController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { company_id } = request.query

    const listDriverUseCase = container.resolve(ListDriversUseCase)

    const drivers = await listDriverUseCase.execute(company_id as string)

    return response.json(instanceToPlain(drivers))
  }
}

export { ListDriversController }