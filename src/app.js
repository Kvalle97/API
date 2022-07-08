import express from "express"
import config from './config'


import productsRoutes from './routes/products.route';
import usersroute from './routes/users.route';
import Autentication from './routes/Autentication.route';
import sucursales from './routes/sucursales.route';


const app = express()
const cors = require('cors');
//settings
app.set('port', config.port)

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//use cors
app.use(cors());

//Rutas en uso
app.use(productsRoutes)
app.use(usersroute)
app.use(Autentication)
app.use(sucursales)

export default app