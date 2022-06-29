import express from "express"
import config from './config'


import productsRoutes from './routes/products.route';
import usersroute from './routes/users.route';
import Autentication from './routes/Autentication.route';

const app = express()

//settings
app.set('port', config.port)

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use(productsRoutes)
app.use(usersroute)
app.use(Autentication)

export default app