import { Router } from "express";
import { ListCompaniesController } from "../../../../modules/companies/useCases/listCompanies/ListCompaniesController";
import { CreateCompanyController } from "../../../../modules/companies/useCases/createCompany/CreateCompanyController";
import { CreateAddressController } from "../../../../modules/infos/useCases/createAddress/CreateAddressController";
import { DeleteCompanyController } from "../../../../modules/companies/useCases/deleteCompany/DeleteCompanyController";
import { CompanyDetailController } from "../../../../modules/companies/useCases/companyDetail/CompanyDetailController";

const companiesRoutes = Router()

const listCompaniesController = new ListCompaniesController()
const createCompaniesController = new CreateCompanyController()
const deleteCompanyUseCase = new DeleteCompanyController()
const companyDetailUseCase = new CompanyDetailController()

const createAddressController = new CreateAddressController()

companiesRoutes.get('/', listCompaniesController.handle)
companiesRoutes.post('/', createCompaniesController.handle)

companiesRoutes.get('/:id', companyDetailUseCase.handle)
companiesRoutes.delete('/:id', deleteCompanyUseCase.handle)

companiesRoutes.post('/address', createAddressController.handle)

export { companiesRoutes }