import { Request, Response } from 'express'
import { CreateTypeUseCase } from "./CreateTypeUseCase";

class CreateTypeController {
  constructor(private createTypeUseCase: CreateTypeUseCase) {}

  handle(request: Request, response: Response): Response {
    const { name } = request.body

    this.createTypeUseCase.execute({ name })

    return response.status(201).send()
  }
}

export { CreateTypeController }