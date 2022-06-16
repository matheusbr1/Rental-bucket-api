import { container } from 'tsyringe'
import { UserRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersRepository'
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository'
import { CustomersRepository } from '../../modules/customers/infra/typeorm/repositories/CustomersRepository'
import { ICustomerRepository } from '../../modules/customers/repositories/ICustomersRepository'
import { DriversRepository } from '../../modules/drivers/infra/typeorm/repositories/DriversRepository'
import { IDriversRepository } from '../../modules/drivers/repositories/IDriversRepository'
import { AdressesRepository } from '../../modules/infos/infra/typeorm/repositories/AdressesRepository'
import { IAdressesRepository } from '../../modules/infos/repositories/IAdressesRepository'
import { ContactsRepository } from '../../modules/infos/infra/typeorm/repositories/ContactsRepository'
import { IContactsRepository } from '../../modules/infos/repositories/IContactsRepository'
import { EquipmentsRepository } from '../../modules/trucks/infra/typeorm/repositories/EquipmentsRepository'
import { TrucksRepository } from '../../modules/trucks/infra/typeorm/repositories/TrucksRepository'
import { TypesRepository } from '../../modules/trucks/infra/typeorm/repositories/TypesRepository'
import { IEquipmentsRepository } from '../../modules/trucks/repositories/IEquipmentsRepository'
import { ITrucksRepository } from '../../modules/trucks/repositories/ITrucksRespository'
import { ITypesRepository } from '../../modules/trucks/repositories/ITypesRepository'
import { IWorkTypesRepository } from '../../modules/works/repositories/IWorkTypesRepository'
import { WorkTypesRepository } from '../../modules/works/infra/typeorm/repositories/WorkTypesRepository'
import { IWorksRepository } from '../../modules/works/repositories/IWorksRepository'
import { WorksRepository } from '../../modules/works/infra/typeorm/repositories/WorksRepository'
import { IUsersTokensRespository } from '../../modules/accounts/repositories/IUsersTokensRepository'
import { UsersTokensRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository'

import './providers/index'

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

container.registerSingleton<IAdressesRepository>(
  'AdressesRepository',
  AdressesRepository
)

container.registerSingleton<IWorkTypesRepository>(
  'WorkTypesRepository',
  WorkTypesRepository
)

container.registerSingleton<IWorksRepository>(
  'WorksRepository',
  WorksRepository
)

container.registerSingleton<IUsersTokensRespository>(
  'UsersTokensRepository',
  UsersTokensRepository
)