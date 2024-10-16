import { AppError } from "../../../../shared/errors/AppError"
import { CompaniesRepositoryInMemory } from "../../../companies/repositories/in-memory/CompaniesRepositoryInMemory"
import { TrucksRepositoryInMemory } from "../../repositories/in-memory/TrucksRepositoryInMemory"
import { TypesRepositoryInMemory } from "../../repositories/in-memory/TypesRepositoryInMemory"
import { CreateTruckUseCase } from "./CreateTruckUseCase"

let trucksRepositoryInMemory: TrucksRepositoryInMemory
let typesRepositoryInMemory: TypesRepositoryInMemory
let companiesRepositoryInMemory: CompaniesRepositoryInMemory
let createTruckUseCase: CreateTruckUseCase

let truckType
let company

describe('Create Truck', () => {
  beforeEach(async () => {
    trucksRepositoryInMemory = new TrucksRepositoryInMemory()
    typesRepositoryInMemory = new TypesRepositoryInMemory()
    companiesRepositoryInMemory = new CompaniesRepositoryInMemory()
    createTruckUseCase = new CreateTruckUseCase(
      trucksRepositoryInMemory,
      typesRepositoryInMemory,
      companiesRepositoryInMemory
    )

    truckType = await typesRepositoryInMemory.create({
      name: 'Truck Type',
      description: 'Truck Description'
    })

    company = await companiesRepositoryInMemory.create({
      name: 'Company name'
    })
  })

  it('should be able to create a truck', async () => {
    const truck = await createTruckUseCase.execute({
      company_id: company.id,
      brand_id: '1',
      model_id: '2',
      plate: 'ABC1234',
      renavam: 1234,
      manufacture_year: 1997,
      model_year: 1997,
      truck_type_id: truckType.id
    })

    expect(truck).toHaveProperty('id')
  })

  it('should not be able to create a truck with a non-existent truck type', async () => {
    expect(async () => {
      await createTruckUseCase.execute({
        company_id: company.id,
        brand_id: '1',
        model_id: '2',
        plate: 'ABC1234',
        renavam: 1234,
        manufacture_year: 1997,
        model_year: 1997,
        truck_type_id: 'non_existent_truck_type_id'
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able create a truck with a existent renavam', async () => {
    expect(async () => {
      await createTruckUseCase.execute({
        company_id: company.id,
        brand_id: '1',
        model_id: '2',
        plate: 'ABC1234',
        renavam: 1234,
        manufacture_year: 1997,
        model_year: 1997,
        truck_type_id: truckType.id
      })

      await createTruckUseCase.execute({
        company_id: company.id,
        brand_id: '1',
        model_id: '2',
        plate: 'ABC5678',
        renavam: 1234,
        manufacture_year: 1997,
        model_year: 1997,
        truck_type_id: truckType.id
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able create a truck with a existent plate', async () => {
    expect(async () => {
      await createTruckUseCase.execute({
        company_id: company.id,
        brand_id: '1',
        model_id: '2',
        plate: 'ABC1234',
        renavam: 1234,
        manufacture_year: 1997,
        model_year: 1997,
        truck_type_id: truckType.id
      })

      await createTruckUseCase.execute({
        company_id: company.id,
        brand_id: '1',
        model_id: '2',
        plate: 'ABC1234',
        renavam: 5678,
        manufacture_year: 1997,
        model_year: 1997,
        truck_type_id: truckType.id
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})