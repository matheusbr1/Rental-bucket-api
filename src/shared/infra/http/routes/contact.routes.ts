import { Router } from 'express'
import { CreateContactController } from '../../../../modules/_contact/useCases/createContact/CreateContactController'
import { DeleteContactController } from '../../../../modules/_contact/useCases/deleteContact/DeleteContactController'


const contactRoutes = Router()

const createContactController = new CreateContactController()
const deleteContactController = new DeleteContactController()

contactRoutes.post('/contact', createContactController.handle)
contactRoutes.delete('/contact/:id', deleteContactController.handle)

export { contactRoutes }