import { CustomersRepository } from "../../repositories/implemetations/CustomersRepository";
import { ListCustomersCotroller } from "./ListCustomersController";
import { ListCustomersUseCase } from "./ListCustomersUseCase";

const customersRepository = CustomersRepository.getInstance()

const listCustomersUseCase = new ListCustomersUseCase(customersRepository)

const listCustomersCotroller = new ListCustomersCotroller(listCustomersUseCase)

export { listCustomersCotroller }