import { Request, Response } from "express";
import { container } from "tsyringe";
import { WorkDetailUseCase } from "./WorkDetailUseCase";
import { instanceToPlain } from "class-transformer";

class WorkDetailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const workDetailUseCase = container.resolve(WorkDetailUseCase)

    const work = await workDetailUseCase.execute(id)

    return response.json(instanceToPlain(work))
  }
}

export { WorkDetailController }