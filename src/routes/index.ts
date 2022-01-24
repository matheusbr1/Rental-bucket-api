import { Router } from "express";
import { driversRoutes } from "./drivers.routes"
import { trucksRoutes } from "./trucks.routes";
import { customersRoutes } from "./customers.routes";

const routes = Router()

routes.use('/drivers', driversRoutes)
routes.use('/trucks', trucksRoutes)
routes.use('/customers', customersRoutes)

export { routes }