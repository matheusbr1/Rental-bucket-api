import { Router } from "express";
import { driversRoutes } from "./drivers.routes"
import { trucksRoutes } from "./trucks.routes";
import { customersRoutes } from "./customers.routes";
import { workRoutes } from "./works.routes"

const routes = Router()

routes.use('/drivers', driversRoutes)
routes.use('/trucks', trucksRoutes)
routes.use('/customers', customersRoutes)
routes.use('/works', workRoutes)

export { routes }