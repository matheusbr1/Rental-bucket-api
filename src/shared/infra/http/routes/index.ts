import { Router } from "express";
import { driversRoutes } from "./drivers.routes"
import { trucksRoutes } from "./trucks.routes";
import { customersRoutes } from "./customers.routes";
import { workRoutes } from "./works.routes"
import { usersRoutes } from "./users.routes"
import { authenticateRoutes } from "./authenticate.routes"

const routes = Router()

routes.use(authenticateRoutes)  
routes.use('/drivers', driversRoutes)
routes.use('/trucks', trucksRoutes)
routes.use('/customers', customersRoutes)
routes.use('/works', workRoutes)
routes.use('/users', usersRoutes)

export { routes }