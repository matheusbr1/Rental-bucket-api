import express from 'express'
import "express-async-errors"
import "../typeorm" // Database
import "reflect-metadata";
import "../../container" // Tysinge
import cors from 'cors'
import { routes } from './routes'
import swaggerUI from 'swagger-ui-express'
import swaggerFile from '../../../swagger.json'
import { handleError } from './middlewares/handleError'

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))

app.use(routes)

app.use(handleError)

const port = 3334

app.listen(port, () => console.log(`Server is running on port ${port}!`))