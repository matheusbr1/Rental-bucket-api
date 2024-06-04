import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { ListWorkUseCase } from "./listWorkUseCase";
import { instanceToPlain } from "class-transformer";
import { WorkStatus } from '../../dtos/IListWorksDTO';

class ListWorkController {
  async handle(request: Request, response: Response): Promise<Response> {
    const query = request.query

    const listWorksUseCase = container.resolve(ListWorkUseCase)

    const work_status = (query.status ?? 'all') as WorkStatus

    const out = await listWorksUseCase.execute({
      company_id: String(query.company_id),
      limit: Number(query.limit ?? 10),
      page: Number(query.page),
      status: work_status
    })

    response.set('X-Total-Count', out.total.toString())
    response.set('X-Page-Count', out.pageCount.toString())
    return response.json(instanceToPlain(out))
  }
}

export { ListWorkController }