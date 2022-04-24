import { container } from 'tsyringe'
import { UserRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersRepository'
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository'
import { ContactsRepository } from '../../modules/customers/infra/typeorm/repositories/ContactsRepository'
import { CustomersRepository } from '../../modules/customers/infra/typeorm/repositories/CustomersRepository'
import { IContactsRepository } from '../../modules/customers/repositories/IContactsRepository'
import { ICustomerRepository } from '../../modules/customers/repositories/ICustomersRepository'
import { DriversRepository } from '../../modules/drivers/infra/typeorm/repositories/DriversRepository'
import { IDriversRepository } from '../../modules/drivers/repositories/IDriversRepository'
import { EquipmentsRepository } from '../../modules/trucks/infra/typeorm/repositories/EquipmentsRepository'
import { TrucksRepository } from '../../modules/trucks/infra/typeorm/repositories/TrucksRepository'
import { TypesRepository } from '../../modules/trucks/infra/typeorm/repositories/TypesRepository'
import { IEquipmentsRepository } from '../../modules/trucks/repositories/IEquipmentsRepository'
import { ITrucksRepository } from '../../modules/trucks/repositories/ITrucksRespository'
import { ITypesRepository } from '../../modules/trucks/repositories/ITypesRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UserRepository
)

container.registerSingleton<IEquipmentsRepository>(
  'EquipmentsRepository',
  EquipmentsRepository
)

container.registerSingleton<ITypesRepository>(
  'TypesRepository',
  TypesRepository
)

container.registerSingleton<ITrucksRepository>(
  'TrucksRepository',
  TrucksRepository
)

container.registerSingleton<IDriversRepository>(
  'DriversRepository',
  DriversRepository
)

container.registerSingleton<ICustomerRepository>(
  'CustomersRepository',
  CustomersRepository
)

container.registerSingleton<IContactsRepository>(
  'ContactsRepository',
  ContactsRepository
)