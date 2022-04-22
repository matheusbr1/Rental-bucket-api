import { Router } from 'express'
import { createDriverController } from '../../../../modules/drivers/useCases/createDriver'
import { listDriversController } from '../../../../modules/drivers/useCases/listDriver'

const driversRoutes = Router()

driversRoutes.post('/', (request, response) => {
  createDriverController.handle(request, response)
})

driversRoutes.get('/', (request, response) => {
  listDriversController.handle(request, response)
})

export { driversRoutes }