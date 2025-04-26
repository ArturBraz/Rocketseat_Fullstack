import express from 'express'
import { routes } from './routes'
import { errorHandling } from './middlewares/error-handling'

const PORT = 3333

const app = express()
app.use(express.json()) // Permite envio de JSON
app.use(routes) // Importa as rotas

app.use(errorHandling) // Middleware para tratamento de erros

app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}!`)
})