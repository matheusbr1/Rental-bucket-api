import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IWorksRepository } from "../../repositories/IWorksRepository";
import { WorkStatus } from "../../infra/typeorm/entities/Work";

@injectable()
class RemoveBucketUseCase {
  constructor(
    @inject('WorksRepository')
    private worksRepository: IWorksRepository
  ) { }

  async execute(id: string, quantity: number): Promise<void> {
    if (!id) {
      throw new AppError('Missing work id')
    }

    let work = await this.worksRepository.findById(id)

    if (!work) {
      throw new AppError('Work not found')
    }

    if (
      work.status !== WorkStatus.PLACED &&
      work.status !== WorkStatus["PARTIAL-REMOVED"]
    ) {
      throw new AppError(`This work is ${work.status}. The status to place a bucked should be placed or partial-removed`)
    }

    if (!quantity) {
      throw new AppError('quantity is missing')
    }

    if (Number.isNaN(quantity)) {
      throw new AppError('quantity is invalid')
    }

    if (quantity < 1) {
      throw new AppError('The min quantity is 1')
    }

    if (quantity > work.quantity) {
      throw new AppError(`The max quantity is ${work.quantity}`)
    }

    const updatedQuantity = Number(work.quantity) - quantity

    work = {
      ...work,
      quantity: updatedQuantity,
      status: updatedQuantity === 0 ? WorkStatus.REMOVED : WorkStatus["PARTIAL-REMOVED"]
    }

    await this.worksRepository.create(work)

    return
  }
}

export { RemoveBucketUseCase }