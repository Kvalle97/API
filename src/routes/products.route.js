import { Router } from "express";

import { getproducts,getproductscodigo,getproductscodigoandsucursal  } from "../controllers/products.controllers";
import verifyToken from "../controllers/verifyToken";

const router = Router()

router.get('/products',verifyToken, getproducts)

router.get('/products/:Codigo',verifyToken, getproductscodigo)

router.get('/products/:Codigo/:Empresa', verifyToken, getproductscodigoandsucursal)

router.delete('/products',)

router.put ('/products',)



export default router