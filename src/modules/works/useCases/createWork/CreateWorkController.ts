import { Request, Response} from 'express'
import { container } from 'tsyringe';
import { CreateWorkUseCase } from './CreateWorkUseCase';

class CreateWorkController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body

    const createWorkUseCase = container.resolve(CreateWorkUseCase)

    const work = await createWorkUseCase.execute(data)

    return response.status(201).send(work)
  }
}

export { CreateWorkController }