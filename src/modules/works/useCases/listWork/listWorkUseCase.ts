import { IWorksRepository } from "../../repositories/IWorksRepository";

class ListWorkUseCase {
  constructor(private worksRepository: IWorksRepository) {}

  execute() {
    const allWorks = this.worksRepository.list()

    return allWorks
  }
}

export { ListWorkUseCase }