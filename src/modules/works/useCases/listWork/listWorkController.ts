import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { ListWorkUseCase } from "./listWorkUseCase";
import { instanceToPlain } from "class-transformer";

class ListWorkController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listWorksUseCase = container.resolve(ListWorkUseCase)

    const allWorks = await listWorksUseCase.execute()

    return response.json(instanceToPlain(allWorks))
  }
}

export { ListWorkController }