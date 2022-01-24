import { Request, Response } from "express";
import { CreateDriverUseCase } from "./CreateDriverUseCase";

class CreateDriverController {
  constructor(private createDriverUseCase: CreateDriverUseCase) {}

  handle(request: Request, response: Response): Response {
    const data = request.body

    this.createDriverUseCase.execute(data)

    return response.status(201).send()
  }
}

export { CreateDriverController }