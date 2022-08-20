import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateWorkUseCase } from "./UpdateWorkUseCase";
import { instanceToPlain } from "class-transformer";

class UpdateWorkController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body
    
    const { id } = request.params

    const updateWorkUseCase = container.resolve(UpdateWorkUseCase)

    const updatedWork = await updateWorkUseCase.execute(id, data)

    return response.json(instanceToPlain({
      message: 'register updated',
      data: updatedWork
    }))
  }
}

export { UpdateWorkController }