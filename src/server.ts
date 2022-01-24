import express from 'express'
import cors from 'cors'
import { routes } from './routes'
import swaggerUI from 'swagger-ui-express'
import swaggerFile from './swagger.json'

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))

app.use(routes)

app.listen(3334, () => console.log('Server is running!'))