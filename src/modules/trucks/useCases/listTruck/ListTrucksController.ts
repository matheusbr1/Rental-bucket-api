import { Request, Response } from 'express'
import { ListTrucksUseCase } from './ListTrucksUseCase'

class ListTrucksController {
  constructor (private listTrucksUseCase: ListTrucksUseCase) {}

  handle(request: Request, response: Response): Response {
    const trucks = this.listTrucksUseCase.execute()

    return response.json(trucks)
  }
}

export { ListTrucksController }