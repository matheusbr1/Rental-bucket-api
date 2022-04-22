import { Router } from "express";
import { driversRoutes } from "./drivers.routes"
import { trucksRoutes } from "./trucks.routes";
import { customersRoutes } from "./customers.routes";
import { workRoutes } from "./works.routes"
import { usersRoutes } from "./users.routes"
import { authenticateRoutes } from "./authenticate.routes"
import { ensureAutenticated } from "../middlewares/ensureAuthenticated";

const routes = Router()

routes.use(authenticateRoutes)
routes.use('/users', usersRoutes)

routes.use(ensureAutenticated)

routes.use('/drivers', driversRoutes)
routes.use('/trucks', trucksRoutes)
routes.use('/customers', customersRoutes)
routes.use('/works', workRoutes)

export { routes }