import { Router } from "express";

import { getproducts } from "../controllers/products.controllers";
import verifyToken from "../controllers/verifyToken";

const router = Router()

router.get('/products',verifyToken, getproducts)

router.post('/products', )

router.get('/products',)

router.delete('/products',)

router.put ('/products',)



export default router