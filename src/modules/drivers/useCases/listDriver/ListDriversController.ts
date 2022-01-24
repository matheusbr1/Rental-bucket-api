import { Request, Response } from "express";
import { ListDriversUseCase } from "./ListDriversUseCase";

class ListDriversController {
  constructor (private listDriversUseCase: ListDriversUseCase) {}

  handle(request: Request, response: Response): Response {
    const drivers = this.listDriversUseCase.execute()

    return response.json(drivers)
  }
}

export { ListDriversController }