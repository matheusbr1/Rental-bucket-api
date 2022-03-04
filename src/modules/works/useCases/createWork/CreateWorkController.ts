import { Request, Response} from 'express'
import { CreateWorkUseCase } from './CreateWorkUseCase';

class CreateWorkController {
  constructor (private createWorkUseCase: CreateWorkUseCase) {}

  handle(request: Request, response: Response): Response {
    const data = request.body

    this.createWorkUseCase.execute(data)

    return response.status(201).send()
  }
}

export { CreateWorkController }