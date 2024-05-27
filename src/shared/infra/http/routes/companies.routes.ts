import { Router } from "express";
import { ListCompaniesController } from "../../../../modules/companies/useCases/listCompanies/ListCompaniesController";
import { CreateCompanyController } from "../../../../modules/companies/useCases/createCompany/CreateCompanyController";
import { DeleteCompanyController } from "../../../../modules/companies/useCases/deleteCompany/DeleteCompanyController";
import { CompanyDetailController } from "../../../../modules/companies/useCases/companyDetail/CompanyDetailController";

const companiesRoutes = Router()

const listCompaniesController = new ListCompaniesController()
const createCompaniesController = new CreateCompanyController()
const deleteCompanyUseCase = new DeleteCompanyController()
const companyDetailUseCase = new CompanyDetailController()

companiesRoutes.get('/', listCompaniesController.handle)
companiesRoutes.post('/', createCompaniesController.handle)

companiesRoutes.get('/:id', companyDetailUseCase.handle)
companiesRoutes.delete('/:id', deleteCompanyUseCase.handle)

export { companiesRoutes }