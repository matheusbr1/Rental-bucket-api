import { CustomersRepository } from '../../repositories/implemetations/CustomersRepository'
import { CreateDriverController } from './CreateCustomerController'
import { CreateCustomerUseCase } from './CreateCustomerUseCase'

const costumersRepository = CustomersRepository.getInstance()

const createCustomerUseCase = new CreateCustomerUseCase(costumersRepository)

const createCustomerController = new CreateDriverController(createCustomerUseCase)

export { createCustomerController }