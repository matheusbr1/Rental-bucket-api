import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListDriversUseCase } from "./ListDriversUseCase";
import { instanceToPlain } from "class-transformer";

class ListDriversController {
  async handle(request: Request, response: Response): Promise<Response> {
    const query = request.query

    const listDriverUseCase = container.resolve(ListDriversUseCase)

    const out = await listDriverUseCase.execute({
      company_id: String(query.company_id),
      limit: Number(query.limit ?? 10),
      page: Number(query.page)
    })

    response.set('X-Total-Count', out.total.toString())
    response.set('X-Page-Count', out.pageCount.toString())
    return response.json(instanceToPlain(out))
  }
}

export { ListDriversController }