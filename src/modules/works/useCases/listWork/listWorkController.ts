import { Request, Response } from 'express'
import { ListWorkUseCase } from "./listWorkUseCase";

class ListWorkController {
  constructor(private listWorkUseCase: ListWorkUseCase) {}

  handle(request: Request, response: Response): Response {
    const allWorks = this.listWorkUseCase.execute()

    return response.send(allWorks)
  }
}

export { ListWorkController }