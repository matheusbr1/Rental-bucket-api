import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListTrucksUseCase } from './ListTrucksUseCase'

class ListTrucksController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listTrucksUseCase = container.resolve(ListTrucksUseCase)

    const trucks = await listTrucksUseCase.execute()

    return response.json(trucks)
  }
}

export { ListTrucksController }