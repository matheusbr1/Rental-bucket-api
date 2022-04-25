import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateWorkTypeUseCase } from "./CreateWorkTypeUseCase";

class CreateWorkTypeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body

    const createWorkTypeUseCase = container.resolve(CreateWorkTypeUseCase)

    const workType = await createWorkTypeUseCase.execute({ name })

    return response.status(201).json(workType)
  }
}

export { CreateWorkTypeController }