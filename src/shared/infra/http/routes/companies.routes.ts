import { Router } from "express";
import { ListCompaniesController } from "../../../../modules/companies/useCases/listCompanies/ListCompaniesController";
import { CreateCompanyController } from "../../../../modules/companies/useCases/createCompany/CreateCompanyController";
import { CreateAddressController } from "../../../../modules/infos/useCases/createAddress/CreateAddressController";

const companiesRoutes = Router()

const listCompaniesController = new ListCompaniesController()
const createCompaniesController = new CreateCompanyController()

const createAddressController = new CreateAddressController()

companiesRoutes.get('/', listCompaniesController.handle)
companiesRoutes.post('/', createCompaniesController.handle)

companiesRoutes.post('/address', createAddressController.handle)

export { companiesRoutes }