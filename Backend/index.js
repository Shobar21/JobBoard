//API Documentation
import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import 'express-async-errors'
//security packages
import helmet from 'helmet'
import xss from 'xss-clean'
import ExpressMongoSanitize from 'express-mongo-sanitize'
//file import
import connectDB from './config/db.js'

//routes import
import testRouter from './routers/testRouter.js'
import authRouter from './routers/authRouter.js'
import errorMiddleware from './middlewares/errorMiddleware.js'
import userRouter from './routers/userRouter.js'
import jobRouter from './routers/jobRouter.js'

// Load environment variables
dotenv.config()

//swagger API config
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Job Portal Application',
      description: 'Node Expressjs Job Portal Application',
    },
    servers: [
      {
        url: 'http://localhost:8000',
      },
    ],
  },
  apis: ['./routers/*.js'],
}
const spec = swaggerJsDoc(options)

//rest object
const app = express()

//middleware
app.use(helmet(``))
app.use(xss())
app.use(ExpressMongoSanitize())
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
//routers
app.use('/api/v1/test', testRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/job', jobRouter)

//home route root
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(spec))
//middleware validation
app.use(errorMiddleware)

//connt mongodb
connectDB()

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.DEV_MODE} mode on port no ${PORT}`
  )
})
