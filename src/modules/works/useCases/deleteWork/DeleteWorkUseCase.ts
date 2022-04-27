import { inject, injectable } from "tsyringe"
import { IWorksRepository } from "../../repositories/IWorksRepository"

@injectable()
class DeleteWorkUseCase {
  constructor(
    @inject('WorksRepository')
    private worksRepository: IWorksRepository
  ) {}

  async execute(id: string): Promise<void> {
    await this.worksRepository.delete(id)

    return
  }
}

export { DeleteWorkUseCase }