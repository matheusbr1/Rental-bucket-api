import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCompaniesUseCase } from "./ListCompaniesUseCase";
import { instanceToPlain } from "class-transformer";

class ListCompaniesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCompaniesUseCase = container.resolve(ListCompaniesUseCase)

    const companies = await listCompaniesUseCase.execute()

    return response.json(instanceToPlain(companies))
  }
}

export { ListCompaniesController }