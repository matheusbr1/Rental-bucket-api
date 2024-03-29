import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListTrucksUseCase } from './ListTrucksUseCase'
import { instanceToPlain } from "class-transformer";

class ListTrucksController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { company_id } = request.query

    const listTrucksUseCase = container.resolve(ListTrucksUseCase)

    const trucks = await listTrucksUseCase.execute(company_id as string)

    return response.json(instanceToPlain(trucks))

  }
}

export { ListTrucksController }