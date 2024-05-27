import express, { Router } from "express"
import path from "path"
import { driversRoutes } from "./drivers.routes"
import { trucksRoutes, truckTypesRoutes } from "./trucks.routes"
import { customersRoutes } from "./customers.routes"
import { companiesRoutes } from "./companies.routes"
import { workRoutes, workTypesRoutes } from "./works.routes"
import { usersRoutes } from "./users.routes"
import { authenticateRoutes } from "./authenticate.routes"
import { ensureAutenticated } from "../middlewares/ensureAuthenticated"
import { checkoutRoute } from "./stripe.routes"
import { contactRoutes } from "./contact.routes"
import { addressRoutes } from "./address.routes"

const routes = Router()

routes.use(express.static(path.join(__dirname, '..', '..', '..', '..', '..', 'tmp')))

routes.use(checkoutRoute)

routes.use(authenticateRoutes)
routes.use('/users', usersRoutes)

routes.use('/companies', companiesRoutes)

routes.use(ensureAutenticated)

routes.use(contactRoutes)
routes.use(addressRoutes)

routes.use('/drivers', driversRoutes)

routes.use('/trucks', trucksRoutes)
routes.use('/truck/types', truckTypesRoutes)

routes.use('/customers', customersRoutes)

routes.use('/works', workRoutes)
routes.use('/work/types', workTypesRoutes)

export { routes }