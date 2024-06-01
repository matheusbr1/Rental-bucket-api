import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListTrucksUseCase } from './ListTrucksUseCase'
import { instanceToPlain } from "class-transformer";

class ListTrucksController {
  async handle(request: Request, response: Response): Promise<Response> {
    const query = request.query

    const listTrucksUseCase = container.resolve(ListTrucksUseCase)

    const trucks = await listTrucksUseCase.execute({
      company_id: String(query.company_id),
      limit: Number(query.limit ?? 10),
      page: Number(query.page)
    })

    return response.json(instanceToPlain(trucks))

  }
}

export { ListTrucksController }